'use strict'

const express = require('express')
const config = require('../config')
const lib = require('../lib')
const utils = require('../lib/utils')

module.exports = function () {
  // eslint-disable-next-line new-cap
  const router = express.Router()

  router.get('/', (req, res) => {
    // TODO: check if a user is signed in here later + add tests:
    // eslint-disable-next-line no-constant-condition
    if (false) {
      res.render('dashboard.html', {
        title: 'Dashboard'
      })
    }
    res.render('home.html', {
      title: 'Home'
    })
  })

  router.get('/:owner/:name', async (req, res) => {
    const api = new lib.DataHubApi(config)
    const dpjson = await api.getPackage(req.params.owner, req.params.name)
    let readme = await api.getPackageFile(req.params.owner, req.params.name, 'README.md')
    const shortReadme = utils.makeSmallReadme(readme)
    readme = utils.dpInReadme(readme, dpjson)
    readme = utils.textToMarkdown(readme)
    const dpBitStoreUrl = [config.get('bitstoreBaseUrl'), 'metadata', req.params.owner, req.params.name, '_v', 'latest'].join('/')
    res.render('showcase.html', {
      title: req.params.owner + ' | ' + req.params.name,
      dataset: utils.prettifyBytes(dpjson),
      datapackageUrl: dpBitStoreUrl + '/datapackage.json',
      readmeShort: shortReadme,
			// eslint-disable-next-line camelcase
      readme_long: readme
    })
  })

  router.get('/search', (req, res) => {
    res.render('search.html', {
      title: 'Search'
    })
  })

  router.get('/:owner', (req, res) => {
    res.render('owner.html', {
      title: req.params.owner
    })
  })

  return router
}
