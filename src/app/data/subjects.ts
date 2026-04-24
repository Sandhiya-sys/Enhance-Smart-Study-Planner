export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Unit {
  unitNumber: number;
  title: string;
  introduction: string[];
  importantQuestions: string[];
  mcqs: MCQ[];
  pdfPath?: string;
}

export interface Subject {
  id: string;
  name: string;
  units: Unit[];
}

export const subjects: Subject[] = [
  {
    id: 'dwdm',
    name: 'DATA WAREHOUSING AND DATA MINING',
    units: [
      {
        unitNumber: 1,
        title: 'Introduction',
        introduction: [
          'This unit introduces the Data Warehouse concept, which stores large integrated data from multiple sources.',
          'It explains the architecture and components of a data warehouse system.',
          'It also covers OLAP operations and multidimensional models, which help in fast and efficient data analysis for decision making.',
          'Data warehouses support business intelligence and analytics by providing a centralized repository of information.',
          'The three-tier architecture separates data sources, warehouse server, and client applications for better scalability.',
          'OLAP operations like drill-down, roll-up, slice, and dice enable flexible data exploration and reporting.'
        ],
        importantQuestions: [
          'Explain Data Warehouse architecture with neat diagram.',
          'Differentiate between OLAP and OLTP.',
          'Describe Multidimensional Data Model and OLAP operations.',
          'Explain Three-tier architecture.',
          'Discuss Data Warehouse implementation.',
          'Explain characteristics of Data Warehouse.'
        ],
        mcqs: [
          { question: 'What is OLAP?', options: ['Online Analytical Processing', 'Online Transaction Processing', 'Object Layer Access', 'Offline Analysis Process'], correctAnswer: 0 },
          { question: 'Data warehouse is used for:', options: ['Transactions', 'Analysis and Reporting', 'Coding', 'Networking'], correctAnswer: 1 },
          { question: 'OLTP is mainly used for:', options: ['Analysis', 'Reporting', 'Day-to-day Transactions', 'Data Mining'], correctAnswer: 2 },
          { question: 'Data warehouse stores:', options: ['Current data only', 'Historical and Integrated data', 'Temporary data', 'Random data'], correctAnswer: 1 },
          { question: 'Architecture of data warehouse has:', options: ['Single layer', 'Two-tier', 'Three-tier', 'No architecture'], correctAnswer: 2 },
          { question: 'OLAP supports:', options: ['Complex Analysis', 'Simple Transactions', 'Compilation', 'Network Routing'], correctAnswer: 0 },
          { question: 'Multidimensional model uses:', options: ['Tables', 'Data Cubes', 'Graphs', 'Trees'], correctAnswer: 1 },
          { question: 'Data warehouse is:', options: ['Volatile', 'Non-volatile', 'Temporary', 'Frequently changing'], correctAnswer: 1 },
          { question: 'Fact table stores:', options: ['Attributes', 'Dimensions', 'Measures and Metrics', 'Text only'], correctAnswer: 2 },
          { question: 'Dimension table contains:', options: ['Measures', 'Descriptive Attributes', 'Code', 'Transactions'], correctAnswer: 1 },
          { question: 'Drill-down operation means:', options: ['Summarize data', 'Go to detailed view', 'Delete data', 'Upload data'], correctAnswer: 1 },
          { question: 'Roll-up operation means:', options: ['Detailed view', 'Summary/Aggregation', 'Delete records', 'Insert records'], correctAnswer: 1 },
          { question: 'ETL stands for:', options: ['Extract Transform Load', 'Enter Transfer Load', 'Execute Test Load', 'Evaluate Transform Link'], correctAnswer: 0 },
          { question: 'Star schema contains:', options: ['Only fact tables', 'Fact and dimension tables', 'Only dimension tables', 'No tables'], correctAnswer: 1 },
          { question: 'Data warehouse is:', options: ['Subject-oriented', 'Application-oriented', 'Random-oriented', 'User-oriented'], correctAnswer: 0 }
        ],
        pdfPath: '/src/imports/UNIT_1-DMW.pdf'
      },
      {
        unitNumber: 2,
        title: 'Data Preprocessing',
        introduction: [
          'This unit focuses on Data Mining techniques used to extract useful knowledge from large datasets.',
          'It explains data preprocessing steps like cleaning, integration, transformation, and reduction to improve data quality before mining.',
          'Data cleaning handles missing values, noisy data, and inconsistencies to ensure accuracy.',
          'Data integration combines data from multiple sources into a unified view for comprehensive analysis.',
          'Data transformation converts data into appropriate formats suitable for mining algorithms.',
          'Data reduction techniques decrease data volume while maintaining analytical integrity and improving efficiency.'
        ],
        importantQuestions: [
          'Explain Data Mining functionalities.',
          'Describe Data Preprocessing steps.',
          'Explain Data Cleaning methods.',
          'Discuss Data Integration and Transformation.',
          'Explain Data Reduction techniques.',
          'Describe Architecture of Data Mining Systems.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT_2-DMW.pdf'
      },
      {
        unitNumber: 3,
        title: 'Association Rule Mining',
        introduction: [
          'This unit explains Association Rule Mining, which finds relationships between data items.',
          'It introduces important algorithms like Apriori and FP-Growth used to discover frequent patterns and associations in large databases.',
          'Association rules help identify patterns like "customers who buy X also buy Y" for market basket analysis.',
          'The Apriori algorithm uses a bottom-up approach with candidate generation and pruning.',
          'FP-Growth algorithm uses a compact tree structure to avoid expensive candidate generation.',
          'Multilevel and multidimensional association rules extend basic concepts for more complex pattern discovery.'
        ],
        importantQuestions: [
          'Explain Apriori Algorithm with example.',
          'Describe FP-Growth Algorithm.',
          'Compare Apriori and FP-Growth.',
          'Explain Multilevel Association Rules.',
          'Discuss Multidimensional Association Rules.',
          'Explain Association Rule Mining with example.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT_3-DMW.pdf'
      },
      {
        unitNumber: 4,
        title: 'Classification',
        introduction: [
          'This unit deals with Classification techniques, which are used to predict categories based on input data.',
          'It includes methods like Decision Trees, Bayesian classification, KNN, and Neural Networks, along with performance evaluation.',
          'Classification assigns data objects to predefined classes based on training data patterns.',
          'Decision trees provide interpretable models with tree-structured classification rules.',
          'Bayesian classification uses probability theory for prediction with strong statistical foundations.',
          'Performance metrics like accuracy, precision, recall, and F1-score evaluate classifier effectiveness.'
        ],
        importantQuestions: [
          'Explain Decision Tree Induction.',
          'Describe Bayesian Classification.',
          'Explain KNN algorithm.',
          'Discuss Backpropagation.',
          'Explain Classification issues.',
          'Describe Classifier Accuracy.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT_4-DMW.pdf'
      },
      {
        unitNumber: 5,
        title: 'Clustering',
        introduction: [
          'This unit focuses on Clustering techniques, which group similar data objects without predefined labels.',
          'It explains algorithms like K-Means, K-Medoids, and hierarchical clustering methods.',
          'Clustering is an unsupervised learning technique that discovers natural groupings in data.',
          'K-Means partitions data into K clusters by minimizing within-cluster variance.',
          'Hierarchical clustering creates a tree of clusters using agglomerative or divisive approaches.',
          'Clustering applications include customer segmentation, image processing, and anomaly detection.'
        ],
        importantQuestions: [
          'Explain K-Means clustering algorithm.',
          'Describe K-Medoids method.',
          'Explain Agglomerative clustering.',
          'Describe Divisive clustering.',
          'Discuss types of data in clustering.',
          'Explain clustering with example.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT_5-DMW.pdf'
      }
    ]
  },
  {
    id: 'hrm',
    name: 'HUMAN RESOURCE MANAGEMENT',
    units: [
      {
        unitNumber: 1,
        title: 'Introduction',
        introduction: [
          'This unit explains the evolution of HRM from Personnel Management and its role in modern organizations.',
          'It highlights how HRM focuses on employee development, productivity, and adapting to changing environments.',
          'HRM manages the human aspect of organizations including recruitment, training, and performance management.',
          'The evolution from personnel management reflects a shift from administrative to strategic focus.',
          'Modern HRM adapts to globalization, technology, and changing workforce expectations.',
          'Effective HRM practices contribute directly to organizational success and competitive advantage.'
        ],
        importantQuestions: [
          'Explain Evolution of HRM.',
          'Differentiate Personnel Management and HRM.',
          'Discuss principles of HRM.',
          'Explain HRM in changing environment.',
          'Describe functions of HR department.',
          'Explain importance of HRM.'
        ],
        mcqs: [
          { question: 'HRM stands for:', options: ['Human Resource Management', 'Human Relation Model', 'Human Resource Method', 'Human Rights Management'], correctAnswer: 0 },
          { question: 'HRM primarily deals with:', options: ['Machines', 'People and Employees', 'Data storage', 'Product design'], correctAnswer: 1 },
          { question: 'Recruitment means:', options: ['Hiring employees', 'Training employees', 'Firing employees', 'Promoting employees'], correctAnswer: 0 },
          { question: 'HRM evolved from:', options: ['Finance Management', 'Personnel Management', 'Marketing', 'Operations'], correctAnswer: 1 },
          { question: 'Main HR function includes:', options: ['Software coding', 'Talent Acquisition', 'Network setup', 'Debugging'], correctAnswer: 1 },
          { question: 'Employee empowerment means:', options: ['Strict control', 'Giving authority to employees', 'Reducing salary', 'Limiting roles'], correctAnswer: 1 },
          { question: 'Job rotation involves:', options: ['Same job forever', 'Changing roles periodically', 'Immediate promotion', 'Termination'], correctAnswer: 1 },
          { question: 'Training improves:', options: ['Employee Skills', 'Building structure', 'Hardware', 'Networks'], correctAnswer: 0 },
          { question: 'HRM helps in:', options: ['Cost reduction only', 'Organizational Growth', 'Software coding', 'Data storage'], correctAnswer: 1 },
          { question: 'Selection process means:', options: ['Rejecting all', 'Choosing right candidates', 'Random hiring', 'No process'], correctAnswer: 1 },
          { question: 'Compensation includes:', options: ['Work hours only', 'Salary and Benefits', 'Leave only', 'Office space'], correctAnswer: 1 },
          { question: 'HR planning involves:', options: ['Future workforce needs', 'Coding tasks', 'Network design', 'Data backup'], correctAnswer: 0 },
          { question: 'Performance appraisal is:', options: ['Employee Evaluation', 'Hiring process', 'Office design', 'Data entry'], correctAnswer: 0 },
          { question: 'HRM improves:', options: ['Employee Efficiency', 'System errors', 'Software bugs', 'Network delays'], correctAnswer: 0 },
          { question: 'Job enrichment means:', options: ['Reducing tasks', 'Adding meaningful work', 'Removing responsibilities', 'No changes'], correctAnswer: 1 }
        ],
        pdfPath: '/src/imports/UNIT-1-HRM.pdf'
      },
      {
        unitNumber: 2,
        title: 'Job Design and Empowerment',
        introduction: [
          'This unit focuses on job design techniques and employee empowerment.',
          'It explains how proper job structuring and giving authority to employees improves motivation and efficiency.',
          'Job design determines tasks, responsibilities, and relationships that make up individual jobs.',
          'Techniques like job enrichment, rotation, and enlargement enhance employee satisfaction and productivity.',
          'Flexible working arrangements accommodate diverse employee needs and improve work-life balance.',
          'Employee empowerment gives workers authority and autonomy, leading to increased engagement and innovation.'
        ],
        importantQuestions: [
          'Explain Job Design with techniques.',
          'Discuss Job Enrichment and Job Rotation.',
          'Explain Flexible Working Hours.',
          'Define Employee Empowerment.',
          'Explain types of empowerment.',
          'Discuss importance of empowerment.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT-2-HRM.pdf'
      },
      {
        unitNumber: 3,
        title: 'Recruitment and Selection',
        introduction: [
          'This unit explains recruitment and selection processes used to hire suitable employees.',
          'It covers manpower planning, recruitment sources, and selection procedures.',
          'Recruitment attracts qualified candidates while selection chooses the best fit for positions.',
          'Manpower planning ensures the right number and type of employees are available when needed.',
          'Internal and external recruitment sources each offer distinct advantages for talent acquisition.',
          'A systematic selection process including tests and interviews ensures hiring quality candidates.'
        ],
        importantQuestions: [
          'Explain Recruitment process.',
          'Differentiate Recruitment and Selection.',
          'Describe Selection procedure.',
          'Explain Manpower planning.',
          'Discuss sources of recruitment.',
          'Explain importance of selection process.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT-3-HRM.pdf'
      },
      {
        unitNumber: 4,
        title: 'Training and Development',
        introduction: [
          'This unit deals with training and development of employees to improve their skills and performance.',
          'It includes various training methods and performance appraisal techniques.',
          'Training bridges the gap between current and desired employee competencies.',
          'Development programs prepare employees for future roles and career advancement.',
          'Various training methods include on-the-job, off-the-job, and e-learning approaches.',
          'Performance appraisal evaluates employee contributions and identifies development needs.'
        ],
        importantQuestions: [
          'Explain Training and Development.',
          'Discuss need for training.',
          'Explain Induction Training.',
          'Describe methods of training.',
          'Explain Management Development Programme.',
          'Discuss Employee Appraisal.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT-4-HRM.pdf'
      },
      {
        unitNumber: 5,
        title: 'Compensation Management',
        introduction: [
          'This unit explains compensation management, including wages, salaries, and incentives.',
          'It ensures fair payment and motivation of employees.',
          'Compensation includes all forms of financial and non-financial rewards for employee contributions.',
          'Job evaluation determines relative worth of positions to establish equitable pay structures.',
          'Wage and salary administration maintains internal equity and external competitiveness.',
          'A well-designed compensation system attracts, retains, and motivates talented employees.'
        ],
        importantQuestions: [
          'Explain Compensation and its types.',
          'Discuss Job Evaluation.',
          'Explain Wage and Salary Administration.',
          'Describe Executive Compensation.',
          'Explain Merit Rating.',
          'Discuss importance of compensation system.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/UNIT-5-HRM.pdf'
      }
    ]
  },
  {
    id: 'mobile',
    name: 'MOBILE COMMUNICATION',
    units: [
      {
        unitNumber: 1,
        title: 'Introduction',
        introduction: [
          'This unit explains the fundamentals of wireless communication, including signal transmission, modulation, and multiplexing.',
          'It also covers multiple access techniques like FDMA, TDMA, and CDMA.',
          'Wireless communication uses electromagnetic waves to transmit information without physical connections.',
          'Multiplexing techniques enable multiple signals to share the same communication channel efficiently.',
          'Spread spectrum techniques enhance security and reduce interference in wireless systems.',
          'The cellular system concept divides coverage areas into cells for frequency reuse and improved capacity.'
        ],
        importantQuestions: [
          'Explain wireless communication fundamentals.',
          'Describe signal propagation.',
          'Explain multiplexing and modulation.',
          'Discuss spread spectrum techniques.',
          'Explain FDMA, TDMA, CDMA.',
          'Describe cellular system concept.'
        ],
        mcqs: [
          { question: 'Wireless communication uses:', options: ['Copper wires', 'Radio waves', 'Optical cables', 'Fiber optics'], correctAnswer: 1 },
          { question: 'GSM stands for:', options: ['Global System for Mobile', 'General Signal Mode', 'Global Signal Management', 'General System Module'], correctAnswer: 0 },
          { question: 'CDMA is a:', options: ['Multiple Access method', 'Network topology', 'Programming protocol', 'Storage device'], correctAnswer: 0 },
          { question: 'Cellular system divides area into:', options: ['Boxes', 'Cells', 'Segments', 'Layers'], correctAnswer: 1 },
          { question: 'Base station is also called:', options: ['Mobile handset', 'Cell tower/BTS', 'Receiver only', 'Router'], correctAnswer: 1 },
          { question: 'Handoff/Handover means:', options: ['Switching between cells', 'Turning off phone', 'Making a call', 'Sending SMS'], correctAnswer: 0 },
          { question: 'TDMA stands for:', options: ['Time Division Multiple Access', 'Total Data Management', 'Time Data Mode', 'Transfer Data Method'], correctAnswer: 0 },
          { question: 'FDMA stands for:', options: ['Frequency Division Multiple Access', 'Fast Data Access', 'Full Duplex Mode', 'Frequency Data Management'], correctAnswer: 0 },
          { question: 'MAC stands for:', options: ['Media Access Control', 'Machine Access Code', 'Manual Access Channel', 'Mobile Access Center'], correctAnswer: 0 },
          { question: 'Spread spectrum provides:', options: ['Less security', 'Better Security and interference resistance', 'Slower speed', 'No benefits'], correctAnswer: 1 },
          { question: 'Mobile communication is:', options: ['Wired network', 'Wireless network', 'Fixed connection', 'Coaxial only'], correctAnswer: 1 },
          { question: 'Frequency reuse increases:', options: ['System Capacity', 'Cost significantly', 'Device size', 'Weight'], correctAnswer: 0 },
          { question: 'Duplexing allows:', options: ['One-way only', 'Two-way simultaneous communication', 'No communication', 'Broadcasting only'], correctAnswer: 1 },
          { question: 'MSC handles:', options: ['Call routing and management', 'Data storage', 'Screen display', 'Printing'], correctAnswer: 0 },
          { question: '4G/LTE provides:', options: ['High-speed data', 'Slower speeds', 'No internet', 'Voice only'], correctAnswer: 0 }
        ],
        pdfPath: '/src/imports/aUnit_1-MC.pdf'
      },
      {
        unitNumber: 2,
        title: 'GSM and Satellite Communication',
        introduction: [
          'This unit focuses on telecommunication systems like GSM and satellite communication.',
          'It explains network architecture, handover, and security mechanisms.',
          'GSM (Global System for Mobile) is a widely adopted standard for cellular communication worldwide.',
          'GSM architecture includes mobile stations, base stations, and network switching subsystems.',
          'Handover mechanisms maintain call continuity as users move between cells.',
          'Satellite communication provides coverage for remote areas and global connectivity.'
        ],
        importantQuestions: [
          'Explain GSM architecture.',
          'Discuss GSM services and features.',
          'Explain handover in GSM.',
          'Describe GSM security.',
          'Explain satellite communication system.',
          'Discuss routing and localization.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/aUnit_2-MC.pdf'
      },
      {
        unitNumber: 3,
        title: 'Wireless LAN and Bluetooth',
        introduction: [
          'This unit explains Wireless LAN and Bluetooth technologies used for short-range communication.',
          'It includes IEEE 802.11 standards and Bluetooth protocols.',
          'Wireless LANs provide flexible network connectivity without cables in limited areas.',
          'IEEE 802.11 defines standards for WLAN including Wi-Fi technologies.',
          'Bluetooth enables short-range wireless communication between devices like phones, headsets, and computers.',
          'Ad-hoc and infrastructure network modes support different deployment scenarios.'
        ],
        importantQuestions: [
          'Differentiate Infrared and Radio transmission.',
          'Explain IEEE 802.11 architecture.',
          'Describe MAC layer in WLAN.',
          'Explain Bluetooth architecture.',
          'Discuss L2CAP protocol.',
          'Explain Ad-hoc and Infrastructure networks.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/aUnit_3-MC.pdf'
      },
      {
        unitNumber: 4,
        title: 'Mobile Network Layer',
        introduction: [
          'This unit deals with Mobile Network Layer concepts, including Mobile IP, routing, and ad-hoc networks.',
          'It explains how communication is maintained while moving.',
          'Mobile IP allows devices to maintain connectivity while changing network attachment points.',
          'Tunneling and encapsulation techniques forward packets to mobile nodes at new locations.',
          'Ad-hoc networks operate without fixed infrastructure, with nodes acting as routers.',
          'Routing protocols like DSDV and DSR handle dynamic topology changes in mobile environments.'
        ],
        importantQuestions: [
          'Explain Mobile IP architecture.',
          'Describe tunneling and encapsulation.',
          'Explain DHCP in mobile networks.',
          'Discuss Ad-hoc networks.',
          'Explain DSDV and DSR protocols.',
          'Describe routing in mobile networks.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/aUnit_4-MC.pdf'
      },
      {
        unitNumber: 5,
        title: 'Transport and Application Layer',
        introduction: [
          'This unit explains transport and application layer protocols in mobile communication.',
          'It covers TCP improvements and Wireless Application Protocol (WAP).',
          'Traditional TCP faces challenges in wireless networks due to packet loss and variable delays.',
          'TCP improvements include mechanisms like slow start, fast recovery, and congestion control adaptations.',
          'Wireless Application Protocol (WAP) enables mobile devices to access web-based services.',
          'Application layer protocols are optimized for wireless constraints like bandwidth and latency.'
        ],
        importantQuestions: [
          'Explain TCP congestion control.',
          'Describe Slow Start and Fast Recovery.',
          'Explain TCP improvements for mobile networks.',
          'Discuss Wireless Application Protocol.',
          'Explain WAP architecture.',
          'Describe mobile application layer protocols.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/aUnit_5-MC.pdf'
      }
    ]
  },
  {
    id: 'se',
    name: 'SOFTWARE ENGINEERING',
    units: [
      {
        unitNumber: 1,
        title: 'Introduction',
        introduction: [
          'This unit introduces software engineering concepts and process models.',
          'It explains different models like Waterfall, Spiral, Agile, used to develop software systematically.',
          'Software engineering applies engineering principles to software development for quality and reliability.',
          'Process models provide structured frameworks for organizing software development activities.',
          'Different models suit different project types, sizes, and organizational contexts.',
          'Understanding software myths helps avoid common misconceptions about software development.'
        ],
        importantQuestions: [
          'Explain Software Engineering principles.',
          'Describe Software Process Models.',
          'Explain Waterfall Model.',
          'Discuss Spiral Model.',
          'Explain Agile Model.',
          'Describe Software Myths.'
        ],
        mcqs: [
          { question: 'SDLC stands for:', options: ['Software Development Life Cycle', 'System Data Logic', 'Software Design Language', 'System Development Loop'], correctAnswer: 0 },
          { question: 'Waterfall model is a:', options: ['Linear sequential model', 'Circular model', 'Random approach', 'Iterative only'], correctAnswer: 0 },
          { question: 'Software engineering involves:', options: ['Systematic development', 'Random coding', 'Testing only', 'Design only'], correctAnswer: 0 },
          { question: 'First phase of SDLC is:', options: ['Testing', 'Requirement Analysis', 'Deployment', 'Maintenance'], correctAnswer: 1 },
          { question: 'Agile methodology focuses on:', options: ['Iterative development', 'One-time delivery', 'Documentation only', 'No testing'], correctAnswer: 0 },
          { question: 'Software testing finds:', options: ['Bugs and defects', 'Features only', 'Users', 'Hardware'], correctAnswer: 0 },
          { question: 'Software maintenance is:', options: ['Post-deployment support', 'Initial design only', 'Pre-development', 'No activity'], correctAnswer: 0 },
          { question: 'Spiral model combines:', options: ['Waterfall and Prototyping', 'Agile only', 'Testing only', 'Design only'], correctAnswer: 0 },
          { question: 'V-model emphasizes:', options: ['Testing at each phase', 'No testing', 'Coding only', 'Deployment only'], correctAnswer: 0 },
          { question: 'Software myth is a:', options: ['False belief', 'True methodology', 'Testing tool', 'Development framework'], correctAnswer: 0 },
          { question: 'Quality software:', options: ['Meets requirements', 'Fast only', 'Cheap only', 'No testing needed'], correctAnswer: 0 },
          { question: 'Prototyping involves:', options: ['Building early model', 'Final product only', 'No development', 'Testing only'], correctAnswer: 0 },
          { question: 'Software crisis refers to:', options: ['Development challenges', 'Hardware failure', 'Network issues', 'Data loss'], correctAnswer: 0 },
          { question: 'RAD stands for:', options: ['Rapid Application Development', 'Random App Design', 'Real App Data', 'Recursive Algorithm Design'], correctAnswer: 0 },
          { question: 'Software engineering aims for:', options: ['Quality and efficiency', 'Speed only', 'Low cost only', 'Random output'], correctAnswer: 0 }
        ],
        pdfPath: '/src/imports/SP-SE-UNIT-I.pdf'
      },
      {
        unitNumber: 2,
        title: 'Requirements Engineering',
        introduction: [
          'This unit focuses on requirements engineering, which involves gathering and analyzing user needs.',
          'It also explains modeling techniques used to represent system requirements.',
          'Requirements engineering establishes what the system should do before designing how to do it.',
          'Requirement elicitation techniques include interviews, surveys, and observation to gather user needs.',
          'Software Requirements Specification (SRS) documents requirements in a clear, complete manner.',
          'Modeling techniques like data flow diagrams and behavioral models visualize system functionality.'
        ],
        importantQuestions: [
          'Explain Requirements Engineering process.',
          'Describe Requirement Elicitation techniques.',
          'Explain SRS.',
          'Discuss Data Modeling concepts.',
          'Explain Flow-oriented modeling.',
          'Describe Behavioral modeling.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/SP-SE-UNIT-II.pdf'
      },
      {
        unitNumber: 3,
        title: 'Software Design Concepts',
        introduction: [
          'This unit explains software design concepts, which help in structuring the system before coding.',
          'It focuses on design quality and models.',
          'Software design transforms requirements into a blueprint for implementation.',
          'Good design principles include modularity, abstraction, and separation of concerns.',
          'Design quality attributes include maintainability, reusability, and scalability.',
          'Design models provide different views of the system architecture and components.'
        ],
        importantQuestions: [
          'Explain Design Process.',
          'Describe Design Concepts.',
          'Explain Design Model.',
          'Discuss Design Quality.',
          'Explain Modular Design.',
          'Describe software design principles.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/SP-SE-UNIT-III.pdf'
      },
      {
        unitNumber: 4,
        title: 'Software Architecture',
        introduction: [
          'This unit deals with software architecture, which defines the overall structure of the system.',
          'It includes architectural styles and design patterns.',
          'Software architecture provides high-level organization and structure of software systems.',
          'Architectural styles like client-server, layered, and microservices offer proven structural templates.',
          'Design patterns provide reusable solutions to common design problems.',
          'Transform and transaction flow mapping techniques guide architectural design decisions.'
        ],
        importantQuestions: [
          'Explain Software Architecture.',
          'Describe Architectural Styles.',
          'Explain Design Patterns.',
          'Discuss Transform Flow Mapping.',
          'Explain Transaction Flow Mapping.',
          'Describe Data Design.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/SP-SE-UNIT-IV.pdf'
      },
      {
        unitNumber: 5,
        title: 'Software Testing',
        introduction: [
          'This unit focuses on software testing, which ensures software quality and reliability.',
          'It includes testing methods and strategies.',
          'Software testing verifies that software meets requirements and identifies defects before release.',
          'White box testing examines internal code structure and logic paths.',
          'Black box testing validates functionality without knowledge of internal implementation.',
          'Testing strategies define the approach, level, and sequence of testing activities for quality assurance.'
        ],
        importantQuestions: [
          'Explain Software Testing fundamentals.',
          'Describe White Box Testing.',
          'Explain Black Box Testing.',
          'Discuss System Testing.',
          'Explain Testing strategies.',
          'Differentiate White Box and Black Box testing.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/SP-SE-UNIT-V.pdf'
      }
    ]
  },
  {
    id: 'python',
    name: 'PROGRAMMING WITH PYTHON',
    units: [
      {
        unitNumber: 1,
        title: 'Introduction',
        introduction: [
          'This unit introduces the basics of Python programming, including data types, input/output, and string handling.',
          'It explains how to write functions and pass arguments in Python.',
          'It also covers operators, modules, and recursion, which are essential for building programs.',
          'Python supports multiple programming paradigms including procedural, object-oriented, and functional programming.',
          'Understanding basic data types and operators is fundamental to writing efficient Python code.',
          'Functions and modules help in organizing code and making it reusable across different parts of your program.'
        ],
        importantQuestions: [
          'Explain basic data types in Python with examples.',
          'Describe functions in Python and types of arguments.',
          'Explain operators in Python.',
          'Discuss modules in Python with example.',
          'Explain recursion with suitable example.',
          'Describe string basics and operations.'
        ],
        mcqs: [
          { question: 'Python is a:', options: ['Compiled language', 'Interpreted language', 'Assembly language', 'Machine language'], correctAnswer: 1 },
          { question: 'Which data type stores True/False?', options: ['int', 'str', 'bool', 'float'], correctAnswer: 2 },
          { question: 'Function in Python is defined using:', options: ['func', 'def', 'function', 'define'], correctAnswer: 1 },
          { question: 'Module in Python is:', options: ['A file containing Python code', 'A function', 'A variable', 'A loop'], correctAnswer: 0 },
          { question: 'Recursion means:', options: ['Function calling itself', 'Loop', 'Variable declaration', 'Import statement'], correctAnswer: 0 },
          { question: 'String in Python is enclosed in:', options: ['Brackets', 'Quotes', 'Parentheses', 'Braces'], correctAnswer: 1 },
          { question: 'Arithmetic operator + is used for:', options: ['Subtraction', 'Addition', 'Multiplication', 'Division'], correctAnswer: 1 },
          { question: 'Python was created by:', options: ['Dennis Ritchie', 'Guido van Rossum', 'James Gosling', 'Bjarne Stroustrup'], correctAnswer: 1 },
          { question: 'Comments in Python start with:', options: ['#', '//', '/*', '--'], correctAnswer: 0 },
          { question: 'Which keyword is used to import modules?', options: ['include', 'import', 'require', 'load'], correctAnswer: 1 },
          { question: 'Python file extension is:', options: ['.py', '.python', '.pt', '.pyc'], correctAnswer: 0 },
          { question: 'print() function is used for:', options: ['Input', 'Output', 'Storage', 'Calculation'], correctAnswer: 1 },
          { question: 'Type of 3.14 in Python is:', options: ['int', 'float', 'str', 'bool'], correctAnswer: 1 },
          { question: 'len() function returns:', options: ['Length of object', 'Type of object', 'Value of object', 'Name of object'], correctAnswer: 0 },
          { question: 'Indentation in Python is:', options: ['Optional', 'Mandatory', 'Not required', 'Only for loops'], correctAnswer: 1 }
        ],
         pdfPath: '/src/imports/bUNIT 1-PYTHON.pdf',
      },
      {
        unitNumber: 2,
        title: 'Control Statements and Loops',
        introduction: [
          'This unit focuses on control statements and looping structures in Python.',
          'It explains decision-making using if, else, elif and looping using for and while loops.',
          'Control flow structures allow programs to execute different code based on conditions.',
          'Loops enable repetitive execution of code blocks, making programs more efficient and concise.',
          'String manipulation is essential for text processing and data handling in Python applications.',
          'The range() function is commonly used with loops to generate sequences of numbers for iteration.'
        ],
        importantQuestions: [
          'Explain if…elif…else statement with example.',
          'Describe while loop and for loop with examples.',
          'Explain range() function in Python.',
          'Discuss string creation and accessing elements.',
          'Explain string operations and functions.',
          'Differentiate string functions and string methods.'
        ],
        mcqs: [],
         pdfPath: '/src/imports/bUNIT 2-PYTHON.pdf',
      },
      {
        unitNumber: 3,
        title: 'Data Structures',
        introduction: [
          'This unit explains data structures like lists, tuples, and dictionaries used to store and manage data.',
          'Lists are mutable sequences that can hold elements of different types and can be modified after creation.',
          'Tuples are immutable sequences, providing data integrity and are often used for fixed collections.',
          'Dictionaries store key-value pairs, enabling fast lookups and efficient data organization.',
          'File handling operations allow reading from and writing to files, essential for data persistence.',
          'Exception handling helps manage errors gracefully, preventing program crashes and improving user experience.'
        ],
        importantQuestions: [
          'Explain list, tuple, and dictionary with examples.',
          'Describe regular expressions in Python.',
          'Explain file handling (reading and writing).',
          'Discuss exception handling in Python.',
          'Explain user-defined exceptions.',
          'Differentiate built-in and user-defined exceptions.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/bUNIT 3-PYTHON.pdf',
      },
      {
        unitNumber: 4,
        title: 'Object-Oriented Programming',
        introduction: [
          'This unit introduces Object-Oriented Programming (OOP) concepts in Python such as classes, objects, and inheritance.',
          'Classes serve as blueprints for creating objects, encapsulating data and methods that operate on that data.',
          'Inheritance allows new classes to derive properties and methods from existing classes, promoting code reuse.',
          'OOP principles like encapsulation, abstraction, and polymorphism make code more modular and maintainable.',
          'NumPy provides powerful array operations and mathematical functions for numerical computing and scientific applications.',
          'Pandas offers data structures and analysis tools, making it essential for data manipulation and analysis tasks.'
        ],
        importantQuestions: [
          'Explain OOP concepts in Python.',
          'Describe classes and objects with example.',
          'Explain inheritance in Python.',
          'Discuss namespace concept.',
          'Explain basics of NumPy.',
          'Describe Pandas and its uses.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/bUNIT 4-PYTHON.pdf',

      },
      {
        unitNumber: 5,
        title: 'GUI and Database',
        introduction: [
          'This unit focuses on advanced Python concepts, including Graphical User Interface (GUI) and database connectivity.',
          'Tkinter is Python\'s standard library for creating desktop applications with graphical user interfaces.',
          'GUI components like buttons, labels, frames, and menus allow users to interact with applications visually.',
          'Event-driven programming in GUI applications responds to user actions like clicks, key presses, and mouse movements.',
          'Database connectivity enables Python programs to store, retrieve, and manipulate data in databases like SQLite, MySQL, and PostgreSQL.',
          'Understanding GUI and database integration is crucial for building complete, data-driven desktop applications.'
        ],
        importantQuestions: [
          'Explain GUI in Python.',
          'Describe Tkinter widgets (Button, Label, etc.).',
          'Explain containers like Frame and Canvas.',
          'Discuss Menu and Listbox in Python GUI.',
          'Explain Python database connectivity.',
          'Describe applications of GUI in Python.'
        ],
        mcqs: [],
        pdfPath: '/src/imports/bUNIT 5-PYTHON.pdf',
      }
    ]
  }
];
