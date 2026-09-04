window.NWDL_DATA = {
  research: [
    {
      id: 'R.001',
      title: 'Visual Designers in the Age of Generative AI',
      titleKo: '생성형 AI 시대의 시각디자이너 역할 변화 연구',
      status: 'ONGOING',
      progress: 72,
      period: '2026.07 —',
      updated: '2026-09-04',
      keywords: ['Generative AI', 'Design Practice', 'Visual Communication'],
      question: '생성형 AI의 확산은 시각디자이너의 역할과 디자인 프로세스를 어떻게 변화시키는가?',
      summary: '디자인 생성 도구의 변화가 디자이너의 판단, 편집, 시스템 설계 역할에 미치는 영향을 추적하는 연구 프로젝트입니다.',
      relatedPapers: ['WP.001'],
      relatedJournal: ['J.001'],
      relatedArchive: ['A.001']
    },
    {
      id: 'R.002',
      title: 'Brand Identity Systems for Contemporary Practice',
      titleKo: '동시대 브랜드 아이덴티티 시스템 연구',
      status: 'RESEARCHING',
      progress: 34,
      period: '2026.09 —',
      updated: '2026-09-04',
      keywords: ['Brand Identity', 'System', 'Design Method'],
      question: '브랜드 아이덴티티는 고정된 결과물보다 운영 가능한 시스템으로 어떻게 설계될 수 있는가?',
      summary: '실제 브랜드 운영 과정에서 반복·확장·변형 가능한 시각 시스템의 조건을 기록합니다.',
      relatedPapers: [],
      relatedJournal: [],
      relatedArchive: ['A.002']
    }
  ],

  papers: [
    {
      id: 'WP.001',
      type: 'WORKING PAPER',
      title: 'Generative AI and the Changing Role of Visual Designers',
      titleKo: '생성형 AI 환경에서 시각디자이너의 역할 변화에 관한 연구',
      status: 'WRITING',
      progress: 64,
      updated: '2026-09-04',
      stages: [
        ['Research Question', 'COMPLETE'],
        ['Literature Review', 'COMPLETE'],
        ['Research Design', 'COMPLETE'],
        ['Experiment', 'IN PROGRESS'],
        ['Data Analysis', 'PLANNED'],
        ['Writing', 'IN PROGRESS'],
        ['Submission', 'PLANNED']
      ],
      relatedResearch: ['R.001']
    },
    {
      id: 'P.001',
      type: 'PUBLICATION',
      title: 'Publication Archive Placeholder',
      titleKo: '게재 논문 아카이브 예시',
      status: 'PUBLISHED',
      progress: 100,
      updated: '2026-09-04',
      citation: 'Park, Jaeyoung. 2026. Publication metadata placeholder.',
      relatedResearch: []
    }
  ],

  journal: [
    {
      id: 'J.001',
      type: 'NOTE',
      title: 'What Should Designers Design When AI Can Generate Images?',
      titleKo: 'AI가 이미지를 만드는 시대에 디자이너는 무엇을 디자인해야 하는가',
      category: 'AI / DESIGN',
      date: '2026-09-04',
      readTime: '5 MIN READ',
      summary: '생성 능력보다 선택, 편집, 맥락 설계의 중요성이 커지는 디자인 실무의 변화를 짧게 기록합니다.',
      relatedResearch: ['R.001']
    },
    {
      id: 'J.002',
      type: 'MAGAZINE',
      title: 'Designing Systems, Not Isolated Outputs',
      titleKo: '결과물이 아니라 시스템을 디자인한다는 것',
      category: 'BRAND SYSTEM',
      date: '2026-09-01',
      readTime: '7 MIN READ',
      summary: '브랜드 디자인이 단일 로고나 화면보다 운영 가능한 규칙과 구조로 이동하는 이유를 정리합니다.',
      relatedResearch: ['R.002']
    }
  ],

  archive: [
    {
      id: 'A.001',
      title: 'AI-assisted Visual Identity Experiment',
      titleKo: 'AI 기반 비주얼 아이덴티티 실험',
      category: 'AI / IDENTITY',
      year: '2026',
      source: 'Nineworks Design Lab',
      summary: '생성형 이미지 도구를 브랜드 아이덴티티 프로세스 안에서 사용하는 방식과 한계를 기록한 실험입니다.',
      relatedResearch: ['R.001']
    },
    {
      id: 'A.002',
      title: 'Operational Brand System Study',
      titleKo: '운영형 브랜드 시스템 스터디',
      category: 'BRANDING / SYSTEM',
      year: '2026',
      source: 'Nineworks Practice',
      summary: '실무 프로젝트에서 반복 적용 가능한 타이포그래피, 컬러, 컴포넌트 규칙을 연구 아카이브 형식으로 정리합니다.',
      relatedResearch: ['R.002']
    }
  ],

  references: [
    {
      id: 'REF.001',
      type: 'BOOK',
      author: 'Lev Manovich',
      title: 'AI Aesthetics',
      year: '2018',
      keywords: ['AI', 'Aesthetics', 'Visual Culture'],
      relatedResearch: ['R.001'],
      note: 'Reference database placeholder. Replace or expand with actual thesis references.'
    }
  ]
};
