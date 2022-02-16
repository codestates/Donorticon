const { helper } = require('../../models');

const dummy = [
  {
    id: 1,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: 'i have been supporting a kid since 2015...',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: 'parkhacker',
    slogan: 'save the children',
  },
  {
    id: 2,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
  {
    id: 3,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: 'i have been supporting a kid since 2015...',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: 'parkhacker',
    slogan: 'save the children',
  },
  {
    id: 4,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
  {
    id: 5,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
  {
    id: 6,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
  {
    id: 7,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
  {
    id: 8,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
  {
    id: 9,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
  {
    id: 10,
    activity: true,
    createdAt: '2022-02-14T01:36:46.000Z',
    description: '네네네네네네네네네네네네네네네네네네네네네네네네네네네',
    img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
    name: '아름다운세상',
    slogan: 'save the world',
  },
];

module.exports = {
  getList: async (req, res) => {
    const { page, limit } = req.query;
    console.log(page, limit);
    try {
      //TODO: gallery 모델과 helper 모델 id로 연결해서 이미지 한개 끌어와야함
      // const list = await helper.findAll();
      let filteredList = [];
      for (let i = 0; i < 9; i++) {
        const data = {
          id: dummy[i].id,
          name: dummy[i].name,
          img: dummy[i].img,
          slogan: dummy[i].slogan,
        };
        filteredList.push(data);
      }
      res.send(filteredList);
    } catch (e) {
      console.log(e);
    }
  },
};
