export const getAboutConfig = (node, tags = []) => {
  switch (node) {
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
    case 'archive':
      return {
        aboutPage: 'ArchiveAbout',
        aboutPageText: 'archive.about',
      };
    case 'ausstellung': {
      const aboutPage = tags.includes('date_2021_09_18')
        ? 'PankeExhibitionAbout' : 'HDSExhibitionAbout';
      return {
        aboutPage,
        aboutPageText: 'ausstellung.about',
      };
    }
    default:
      return null;
  }
};

export const datePickerConfig = {
         symposium: {
           dates: [
             {
               humanReadable: '01/05/2021',
               tag: 'date_2021_05_01',
             },
             {
               humanReadable: '02/05/2021',
               tag: 'date_2021_05_02',
             },
             {
               humanReadable: '03/05/2021',
               tag: 'date_2021_05_03',
             },
           ],
         },
         ausstellung: {
           reset: false,
           default: 'date_2021_04_30',
           dates: [
             {
               humanReadable: 'Haus der Statistik 30/04 – 09/05',
               tag: 'date_2021_04_30',
             },
             {
               humanReadable: 'panke.gallery 18/09 – 03/10',
               tag: 'date_2021_09_18',
             },
           ],
         },
         unconference: {
           dates: [
             {
               humanReadable: '21/05/2021',
               tag: 'date_2021_05_21',
             },
             {
               humanReadable: '22/05/2021',
               tag: 'date_2021_05_22',
             },
             {
               humanReadable: '23/05/2021',
               tag: 'date_2021_05_23',
             },
           ],
         },
       };
