
//have a projects page that lists all the projects as rotating cards


const projects = [
  {
    name: "A#Maj Bridge",
    description: "A#Maj Bridge is an online multiplayer website for playing bridge with your friends.",
    motivation: "In May of 2020, one of my friends brought up the idea of making an online version of Bridge that was free to play.  I was two months into learning about C# at the time (insert link to playlist syncer and link to webscraper apps here), so I initially started looking into how to create network applications using C#.  Finding it to be much more challenging than I had thought, I decided to look into web development technologies instead.  This is when I came across socket.io.  socket.io was much more intuitive to me, so this is when I switched my efforts from C# to 'Web Development'.  I purchased <a href='https://www.udemy.com/course/the-web-developer-bootcamp/'> The Web Developer Bootcamp 2021</a> by Colt Steele and started learning Node, MongoDB, and PaperJS.",
    features: [

    ],
    challenges: [],
    solutions: [],
    technologies: [
      "HTML5",
      "CSS3",
      "Javascript ES5",
      "Javascript ES6+",
      "PaperJS",
      "socket.io",
      "MongoDB (mongoose)",
      "NodeJS (express)",
    ],
    dates: {
      start: "01/01/01",
      end: "12/12/12"
    },
    whatILearned: [],
    link: "https://still-bayou-51404.herokuapp.com/"
  },
  {
    name: 'The Odin Project',
    description: 'The Odin Project is one of those "What I wish I had when I was learning" resources. Not everyone has access to a computer science education or the funds to attend an intensive coding school and neither of those is right for everyone anyway. This project is designed to fill in the gap for people who are trying to hack it on their own but still want a high quality education.',
    link: 'https://www.theodinproject.com/'
  }
]


export default Projects;