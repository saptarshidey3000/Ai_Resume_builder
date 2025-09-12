export default {
  firstName: 'James',
  lastName: 'Carter',
  jobTitle: 'Full Stack Developer',
  address: '525 N Tryon Street, NC 28117',
  phone: '1234567890',
  email: 'example@gmail.com',
  themeColor: '#ff6666',
  summary: 'Full Stack Developer with 5+ years of experience in building scalable web applications and working with modern frameworks.',

  experience: [
    {
      id: 1,
      title: 'Full Stack Developer',
      companyName: 'Amazon',
      city: 'New York',
      state: 'NY',
      startDate: 'Jan 2021',
      endDate: '',
      currentlyWorking: true,
      workSummary: [
        'Designed, developed, and maintained full-stack applications.',
        'Implemented responsive user interfaces with React.',
        'Built REST APIs with Node.js and Express.',
        'Worked with AWS cloud services for deployment.'
      ]
    },
    {
      id: 2,
      positiontitle: 'Software Engineer',
      companyName: 'Google',
      city: 'San Francisco',
      state: 'CA',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      currentlyWorking: false,
      workSummary: [
        'Developed scalable backend services using Java and Spring Boot.',
        'Collaborated with cross-functional teams to deliver projects.',
        'Optimized database queries and improved system performance.'
      ]
    }
  ],

  education: [
    {
      id: 1,
      institution: 'Massachusetts Institute of Technology',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2014',
      endDate: '2018',
      grade: '3.8 GPA'
      
    },
    {
      id: 2,
      institution: 'Stanford University',
      degree: 'Master of Science in Software Engineering',
      startDate: '2018',
      endDate: '2020',
      grade: '3.9 GPA'
    }
  ],

  skills: [
    'JavaScript',
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'SQL',
    'HTML5 & CSS3',
    'Git & GitHub',
    'AWS & Cloud Deployment',
    'Agile/Scrum'
  ]
};
