const { RESTDataSource } = require('apollo-datasource-rest')

module.exports = class ProfilesAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = process.env.API_URL
  }

  willSendRequest (request) {
    request.headers.set('x-nab-accesstoken', this.context.token)
  }

  async getProfiles () {
    const result = await this.get(`v1/idp/user/profiles`)
    return result.data
  }
}
