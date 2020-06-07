import ApiService from "./ApiService";
import StorageService from "./StorageService";

const partnerRoleName = "partner";

class AuthenticationError extends Error {
  public errorCode: string;
  public message: string;
  constructor(errorCode: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token, user
   * @throws AuthenticationError
   **/
  login: async function(userInfo: any) {
    try {
      const { type, ...loginInfo } = userInfo;
      const response: any = await ApiService.post("auth/local", loginInfo);
      const { jwt, user } = response.data;
      if (type === partnerRoleName && user.role.name !== partnerRoleName) {
        throw new AuthenticationError(
          "403",
          "Only Partner can access this section"
        );
      } else {
        StorageService.saveToken(jwt);
        StorageService.saveUser(user);
        ApiService.setHeader();
      }
      return { jwt, user };
    } catch (error) {
      if (typeof error.response !== "undefined") {
        throw new AuthenticationError(
          error.response.data.statusCode,
          error.response.data.message[0].messages[0].message
        );
      } else {
        throw new AuthenticationError("401", error);
      }
    }
  },

  /**
   * Logout the current user by removing the token from storage.
   *
   * Will also remove `Authorization Bearer <token>` header from future requests.
   **/
  logout() {
    // Remove the token and remove Authorization header from Api Service as well
    StorageService.removeToken();
    StorageService.removeUser();
    ApiService.removeHeader();
  },

  /**
   * Create a user and authenticate him directly.
   *
   * @returns access_token, user
   * @throws AuthenticationError
   **/
  create: async function(userDetails: any) {
    try {
      const response: any = await ApiService.post(
        "/auth/local/register",
        userDetails
      );
      const jwt = response.data.jwt;
      let user = response.data.user;
      StorageService.saveToken(jwt);
      StorageService.saveUser(user);
      ApiService.setHeader();
      // TODO: Remove the following when the issue with the register which is not considering the additional fields
      userDetails._id = user._id;
      user = await this.update(userDetails);
      // End of to be remove
      return { jwt, user };
    } catch (error) {
      if (typeof error.response !== "undefined") {
        throw new AuthenticationError(
          error.response.data.statusCode,
          error.response.data.message
        );
      } else {
        console.error(error);
        throw new AuthenticationError("401", error);
      }
    }
  },

  /**
   * Update user informations (email, firstname, lastname)
   *
   * @returns user
   * @throws AuthenticationError
   **/
  update: async function(userDetails: any) {
    try {
      const response: any = await ApiService.put("/users/" + userDetails._id, {
        email: userDetails.email,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
      });
      const user = response.data;
      StorageService.saveUser(user);
      return user;
    } catch (error) {
      if (typeof error.response !== "undefined") {
        throw new AuthenticationError(
          error.response.data.statusCode,
          error.response.data.message
        );
      } else {
        console.error(error);
        throw new AuthenticationError("401", error);
      }
    }
  },
};

export default UserService;

export { UserService, AuthenticationError };
