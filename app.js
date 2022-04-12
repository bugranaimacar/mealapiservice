const express = require('express');
const app = express()
const port = 3000


app.set('trust proxy', true);

app.get('/', (req, res) => {
    var userip = req.headers['cf-connecting-ip']
  res.status(200).send({
    ipaddress: userip,
    application: 'Yemek API Service',
    routes: '/api/yemekgetir/\:date',
    usage: '0 -> Shows today\'s meal | 1-> Shows tomorrow\'s meal'
  })
})

app.get ('/api/yemekgetir/:date', (req, res) => {
  const { yemeklisteyukle, zamangetir } = require('./yemekgetir.js');
  try { var yemeklerim = yemeklisteyukle(req.params.date); } catch(e) { yemeklerim = 'Yemek listesi bulunamadı!'; }
      res.status(200).send({
      school: 'Aydın Özel Büyük Uğur Anadolu Lisesi',
      date: zamangetir(req.params.date),
      meallist: yemeklerim
  });
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
