// Pflegehinweis: Für eine neue Stelle ein Objekt kopieren, Texte ausfüllen und active: true setzen.
// Zum Ausblenden active: false. Die Stellenanzeige erreicht man über stelle.html?id=<id>.
//
// Pflichtfelder:  id (eindeutig, nur Kleinbuchstaben und Bindestriche), title, location, type, department,
//                 description (Kurztext für die Übersicht), active
// Für die Detailseite: intro, tasks[], requirements[], contactName, contactEmail
// Optional:       about (eigener Text „Wer wir sind“)
//                 benefits (eigene Auswahl der Kacheln, z. B. ['flexibel','verguetung'])
//                 Verfügbare Schlüssel: flexibel, weiterbildung, verguetung, dienstwagen, familie, team
//                 Eigene Kachel: { label: 'Camper-Van zu Vorzugskonditionen', icon: 'benefit-team.png' }
//                 Ohne benefits werden alle sechs Standard-Kacheln angezeigt.
window.jobs = [
  {
    id: 'projektleitung-bau',
    title: 'Projektleiter/in für Bauprojekte in Vollzeit (m/w/d)',
    location: 'Detmold',
    type: 'Vollzeit',
    department: 'Bau / Projektentwicklung',
    description: 'Verantwortungsvolle Bauprojekte im Gewerbe-, Industrie- und Wohnungsbau in einem familiären Umfeld.',
    active: true,

    intro: 'Du bist ein erfahrener Projektleiter oder eine erfahrene Projektleiterin (LP 5 – 9) mit Lust auf verantwortungsvolle Bauprojekte in einem familiären Umfeld? Als inhabergeführtes Familienunternehmen mit Sitz in Detmold und Ulm suchen wir zum nächstmöglichen Zeitpunkt eine/n engagierte/n Projektleiter/in.',

    tasks: [
      'Du steuerst Projekte von der Planung bis zur Fertigstellung, hältst Budget und Termine im Blick',
      'Du koordinierst die Bauausführung, arbeitest mit Handwerkern und Subunternehmern zusammen und sorgst für Top-Qualität',
      'Du übernimmst die Verantwortung für mehrere Baustellen, managst Risiken und berichtest an die Geschäftsleitung',
      'Du arbeitest an vielseitigen Projekten im Gewerbe-, Industrie- und Wohnungsbau deutschlandweit',
      'Unser Team unterstützt dich selbstverständlich während der gesamten Einarbeitungsphase und auch darüber hinaus.'
    ],

    requirements: [
      'Abgeschlossene handwerkliche Ausbildung (nice to have)',
      'Abgeschlossenes Studium in Architektur oder Bauingenieurwesen',
      'Know-how in den Leistungsphasen 5–9 (Gewerbe-, Industrie- und Wohnungsbau)',
      'Teamgeist und Engagement, um dein Team zu motivieren und Projekte voranzutreiben',
      'Durchsetzungsstärke, Überblick und eine strukturierte, selbstständige Arbeitsweise',
      'Flexibilität und lösungsorientiertes Denken, auch wenn’s mal knifflig wird'
    ],

    about: 'Wir sind ein inhabergeführtes Familienunternehmen (Planungsbüro & Projektentwickler) mit Standorten in Detmold und Ulm. Unser 20-köpfiges Team ist eine bunte Mischung aus jungem Elan und geballter Erfahrung – hochmotiviert, innovativ und immer bereit, anzupacken.',
    aboutImage: 'assets/images/gf.jpg',
    aboutImageAlt: 'Die Geschäftsführer der Sander Immobiliengruppe',

    contactName: 'Max Brunert',
    contactEmail: 'm.brunert@sander-projekt.de',
    heroImage: 'assets/images/hero-projektleitung.jpg',
    heroImageAlt: 'Baustelle mit Projektleiter'
  },

  {
    id: 'bauzeichner',
    title: 'Bauzeichner (m/w/d)',
    location: 'Detmold',
    type: 'Vollzeit',
    department: 'Planung',
    description: '[HIER: Kurze Beschreibung der Aufgaben und des Profils ergänzen.]',
    active: true,

    intro: '[HIER: Einleitung zur Stelle.]',
    tasks: ['[HIER: Aufgabe 1]', '[HIER: Aufgabe 2]'],
    requirements: ['[HIER: Anforderung 1]', '[HIER: Anforderung 2]'],

        benefits: ['flexibel', 'weiterbildung', 'verguetung', 'camper', 'familie', 'team'],


    about: 'Wir sind ein inhabergeführtes Familienunternehmen (Planungsbüro & Projektentwickler) mit Standorten in Detmold und Ulm. Unser 20-köpfiges Team ist eine bunte Mischung aus jungem Elan und geballter Erfahrung – hochmotiviert, innovativ und immer bereit, anzupacken.',
    aboutImage: 'assets/images/gf.jpg',
    aboutImageAlt: 'Die Geschäftsführer der Sander Immobiliengruppe',

    contactName: 'Max Brunert',
    contactEmail: 'm.brunert@sander-projekt.de',
    heroImage: 'assets/images/hero-projektleitung.jpg',
    heroImageAlt: 'Baustelle mit Projektleiter',
  },

  {
    id: 'werkstudent',
    title: 'Werkstudent (m/w/d)',
    location: 'Detmold',
    type: 'Teilzeit',
    department: 'Administration',
    description: '[HIER: Kurze Beschreibung der Aufgaben und des Profils ergänzen.]',
    active: true,

    intro: 'Du bist werkstudent und suchst eine spannende Tätigkeit? Dann bist du bei uns genau richtig!',
    tasks: ['[HIER: Aufgabe 1]', '[HIER: Aufgabe 2]'],
    requirements: ['[HIER: Anforderung 1]', '[HIER: Anforderung 2]'],

    benefits: ['flexibel', 'weiterbildung', 'verguetung', 'camper', 'familie', 'team'],

    about: 'Wir sind ein inhabergeführtes Familienunternehmen (Planungsbüro & Projektentwickler) mit Standorten in Detmold und Ulm. Unser 20-köpfiges Team ist eine bunte Mischung aus jungem Elan und geballter Erfahrung – hochmotiviert, innovativ und immer bereit, anzupacken.',
    aboutImage: 'assets/images/gf.jpg',
    aboutImageAlt: 'Die Geschäftsführer der Sander Immobiliengruppe',

    contactName: 'Max Brunert',
    contactEmail: 'm.brunert@sander-projekt.de',
    heroImage: 'assets/images/hero-projektleitung.jpg',
    heroImageAlt: 'Baustelle mit Projektleiter', 
  }
];
