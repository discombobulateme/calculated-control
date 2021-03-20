export const getAboutConfig = (node) => {
  switch (node) {
    case 'ausstellung':
      return {
        aboutPage: 'ExhibitionAbout',
        aboutPageText: 'ausstellung.about',
      };
    case 'journal':
      return {
        aboutPage: 'JournalAbout',
        aboutPageText: 'journal.about',
      };
    case 'symposium':
      return {
        aboutPage: 'SymposiumAbout',
        aboutPageText: 'symposium.about',
      };
    case 'unconference':
      return {
        aboutPage: 'UnconferenceAbout',
        aboutPageText: 'unconference.about',
      };
    default:
      return {
        aboutPage: 'ArchiveAbout',
        aboutPageText: 'archive.about',
      };
  }
};

export const datePickerConfig = {
  symposium: [
    {
      humanReadable: '21/05/2021',
      tag: 'date_21_05_2021',
    },
    {
      humanReadable: '22/05/2021',
      tag: 'date_22_05_2021',
    },
    {
      humanReadable: '23/05/2021',
      tag: 'date_23_05_2021',
    },
  ],
  ausstellung: [
    {
      humanReadable: 'Haus der Statistik 20/04–09/05/2021',
      tag: 'date_20_04_2021',
    },
    {
      humanReadable: 'Panke Gallery 09/2021',
      tag: 'date_09_2021',
    },
  ],
  unconference: [
    {
      humanReadable: '21/05/2021',
      tag: 'date_21_05_2021',
    },
    {
      humanReadable: '22/05/2021',
      tag: 'date_22_05_2021',
    },
    {
      humanReadable: '23/05/2021',
      tag: 'date_23_05_2021',
    },
  ],
}
