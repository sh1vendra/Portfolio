export interface Recommendation {
  id: string
  initials: string
  name: string
  role: string
  traits: string[]
  text: string
}

export const recommendations: Recommendation[] = [
  {
    id: 'leah-grassi',
    initials: 'LG',
    name: 'Leah Grassi',
    role: 'Supervisor @OneStop',
    traits: [
      'Curiosity & Continuous Learning',
      'Ownership',
      'Dependability',
      'Trust & Accountability',
    ],
    text: `I have known Shiv for over 2 years. He has worked as a student worker with us in the TXST One Stop. Shiv has shown us dedication and dependability. He has been with us for a long time and is one of our most senior student workers. He is eager to learn and takes the lead on assignments.  He is always wanting to learn more while achieving the goal in front of him. Shiv is trusted with some very sensitive information, along with discussing sensitive topics, and he shows empathy in his work. Shiv is a joy to work with and to be around!`,
  },
  {
    id: 'jade-houtz',
    initials: 'JH',
    name: 'Jade Houtz',
    role: 'Director @OneStop',
    traits: [
      'Reliable Execution',
      'Attention to Detail',
      'Consistency',
      'Strong Work Ethic',
    ],
    text: `Shivendra has been a Student Assistant in the TXST One Stop for over a year and has become one of our most senior and trusted student employees. He is reliable and consistent in his work while showing great attention to detail for every interaction. His strong work ethic and dedication to providing the best customer service to our students has made him a valued team member in our office.

Not only does Shivendra put his best foot forward in the office, but he is also a dedicated student who excels academically. I am confident in recommending Shivendra for any of his future endeavors, as I know he will be as successful professionally as he has shown to be as a student.`,
  },
  {
    id: 'amy-gillis',
    initials: 'AG',
    name: 'Amy Gillis',
    role: 'Assistant to the Dean, Honors College',
    traits: [
      'Team Player',
      'Strong Communication',
      'Quick Learner',
      'Leadership',
    ],
    text: `I had the pleasure of supervising Shivendra Bhagat during his time as a Student Coordinator at the Honors College at Texas State University (June 2024–May 2025). Shivendra consistently demonstrated a strong work ethic, professionalism, and a positive attitude, making him a true asset to our team.

He managed front desk operations, assisted students and faculty, and supported a variety of projects—from booking study rooms and mailing acceptance letters to answering questions about Honors College admissions. He’s a quick learner with great communication skills and a natural willingness to help others.

Shivendra balanced his job responsibilities with an impressive academic record, showing reliability, teamwork, and initiative throughout. He’s motivated, thoughtful, and dependable, and I’m confident he’ll bring the same dedication and professionalism to any future endeavor.`,
  },
  {
    id: 'alexandria-sanchez',
    initials: 'AS',
    name: 'Alexandria Sanchez',
    role: 'Training Specialist @OneStop',
    traits: [
      'Analytical Thinking',
      'Precision & Accuracy',
      'Continuous Improvement',
      'Bias for Action',
    ],
    text: `I’ve had the pleasure of working with Shivendra, and I am consistently impressed by his diligence and commitment to accuracy. He approaches every task with careful attention, ensuring that the answers and information he provides are not only correct but also thorough and holistic. He takes the time to review files in detail, which reflects his dedication to both quality and integrity.

What sets him apart is his eagerness to stay current—he makes it a point to continually update his knowledge on each topic we cover, which benefits both our team and the students we serve. His work ethic, precision, and proactive approach make him an invaluable asset to any team.`,
  },
]
