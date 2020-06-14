new Vue({
  el: "#app",
  data: {
    word: "", // Word to be shown to the User.
    text: "", // Input field for user to type.
    score: 0, // To display the score for the user.
    time: 10, // To display time remaining for the user.
    showSettingsMenu: true,
    difficulty: "names", // Game difficulty
    isGameRunning: true,
    intervalId: "",
  },
  methods: {
    getRandomWord: function () {
      switch (this.difficulty) {
        case "streetName":
          this.word = faker.address.streetName();
          break;
        case "product":
          this.word = faker.commerce.productName();
          break;
        default:
          this.word = faker.name.findName();
          break;
      }
      this.text = "";
    },
    startCountDown: function () {
      this.intervalId = setInterval(() => {
        this.time--;
      }, 1000);
      this.getRandomWord();
    },
    checkWordMatch: function () {
      let wordLength = this.word.length;
      let textLength = this.text.length;
      if (wordLength == textLength) {
        if (this.word == this.text) {
          this.getRandomWord();
          this.increaseScore();
        }
      }
    },
    increaseScore: function () {
      this.score++;
      this.time += 5;
    },
    startNewGame: function () {
      this.isGameRunning = true;
      this.score = 0;
      this.time = 10;
      clearInterval(this.intervalId);
      this.startCountDown();
    },
  },
  watch: {
    time: function () {
      if (this.time < 0) {
        this.isGameRunning = false;
        this.time = 0;
      }
    },
  },
  mounted: function () {
    this.startCountDown();
  },
});
