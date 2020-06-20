<template>
  <div v-if="!!error">
    <div class="full-screen" ref="errorEyeballs">
      <div class="container">
        <span class="error-num">5</span>
        <div class="eye"></div>
        <div class="eye"></div>

        <p class="sub-text">
          Oh eyeballs! Something went wrong. We're
          <span class="italic">looking</span> to see what happened.
          {{ error }}
        </p>
        <a href="">Go back</a>
      </div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: () => ({
    error: null,
  }),

  errorCaptured(error, vm, info) {
    this.error = error;
    this.$nextTick(() => {
      if (this.$refs.errorEyeballs) {
        const screen = this.$refs.errorEyeballs;
        screen.addEventListener("mousemove", (event) => {
          const eye = document.querySelectorAll(".eye");
          const x = eye[0].offsetLeft + eye[0].offsetWidth / 2;
          const y = eye[0].offsetTop + eye[0].offsetHeight / 2;
          const rad = Math.atan2(event.pageX - x, event.pageY - y);
          const rot = rad * (180 / Math.PI) * -1 + 180;
          eye.forEach(function(ele) {
            ele.style["-webkit-transform"] = "rotate(" + rot + "deg)";
            ele.style["-moz-transform"] = "rotate(" + rot + "deg)";
            ele.style["-ms-transform"] = "rotate(" + rot + "deg)";
            ele.style["transform"] = "rotate(" + rot + "deg)";
          });
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.full-screen {
  background-color: rgb(51, 51, 51);
  width: 100vw;
  height: 100vh;
  color: white;
  font-family: "Arial Black";
  text-align: center;
}

.container {
  padding-top: 4em;
  width: 50%;
  display: block;
  margin: 0 auto;
}

.error-num {
  font-size: 8em;
}

.eye {
  background: #fff;
  border-radius: 50%;
  display: inline-block;
  height: 100px;
  position: relative;
  width: 100px;
  &::after {
    background: #000;
    border-radius: 50%;
    bottom: 56.1px;
    content: " ";
    height: 33px;
    position: absolute;
    right: 33px;
    width: 33px;
  }
}

.italic {
  font-style: italic;
}

p {
  margin-bottom: 4em;
}

a {
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: lightgray;
  }
}
</style>
