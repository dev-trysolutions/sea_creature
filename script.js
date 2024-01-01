const Squid = Vue.component("squid", {
  template: "#squid",

  // created() {
  //   gsap.registerPlugin(MorphSVGPlugin);
  // },

  mounted() {
    gsap.set("g", { y: 130 / 2 });

    let svg = this.$refs.squid;
    let tentacles = gsap.utils.toArray(this.$refs.tentacle);
    console.log(tentacles.length);

    tentacles.forEach((tentacle) => {
      let width = gsap.utils.random(300, 340);

      let frequency = gsap.utils.random(1, 3);
      let amplitude = gsap.utils.random(30, 50);

      let segments = 40;
      let interval = width / segments;

      for (let i = 0; i < segments; i++) {
        let norm = i / (segments - 1);
        let point = tentacle.points.appendItem(svg.createSVGPoint());

        point.x = i * interval;
        point.y = amplitude / 3;

        gsap
          .to(point, 1.2, {
            y: -point.y,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          })
          .progress(norm * frequency);
      }
      gsap.set(tentacle, {
        y: gsap.utils.random(10, 50)
      });
    });

    gsap.to("#head", 2, {
      scale: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }
});

new Vue({
  el: "#app",
  components: { Squid },

  methods: {
    squidsRising: function () {
      let squids = gsap.utils.toArray(".squid-item");
      let speed = gsap.utils.random(15, 20);

      squids.forEach((squid, i) => {
        gsap.fromTo(
          squid,
          speed,
          {
            y: 1700,
            x: "random(100, 900)",
            scale: "random(0.3, 0.6)",
            opacity: "random(0.2, 0.6)"
          },
          {
            y: 0,
            repeat: -1,
            delay: i * 1.5,
            repeatRefresh: true
          }
        );
      });
    },

    mainSquidAnimation: function () {
      gsap.to(".main-squid", 2, {
        x: 100,
        y: 10,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    },

    titleAnimation: function () {
      let tl = gsap.timeline({
        defaults: {
          ease: "pow4.out"
        }
      });

      tl.from("#location", 1, { y: 50, opacity: 0, delay: 5 })
        .from("#sea", 1, { y: 50, opacity: 0 }, "-=.5")
        .from("#planet", 0.8, { y: 50, opacity: 0 });
    }
  },

  mounted() {
    this.squidsRising();
    this.mainSquidAnimation();
    this.titleAnimation();
  }
}),
  document.onkeydown = function (e) {
    return 123 != event.keyCode && !(e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0) || e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0) || e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0) || e.ctrlKey && e.keyCode == "U".charCodeAt(0)) && void 0
  },
  $(document).on("contextmenu", function (e) { return !1 });
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date;
!function () {
  var e = document.createElement("script"),
    t = document.getElementsByTagName("script")[0];
  e.async = !0,
    e.src = "https://embed.tawk.to/5c6d4867f324050cfe342c69/default",

    e.charset = "UTF-8", e.setAttribute("crossorigin", "*"),
    t.parentNode.insertBefore(e, t)
}
