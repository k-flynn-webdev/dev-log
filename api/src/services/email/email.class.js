import Mailgun from 'mailgun-js'

/* eslint-disable no-unused-vars */
export class Email {
  constructor(options) {
    this.options = options || {}
    this.active = options.active
    this.from = options.from

    if (options.active) {
      this.email = Mailgun({
        apiKey: options.api,
        domain: options.domain,
        host: options.host
      })
    }
  }

  /**
   * Send an email via API
   *
   * @param {Email}   data    Email data to send
   * @param {object}  params  feathers Params object
   * @return {Promise<*>}
   */
  async create(data, params) {
    return new Promise((resolve, reject) => {
      if (!this.active) return resolve('Email not active.')

      data.from = this.from

      this.email.messages().send(data, (err, result) => {
        if (err) return reject(err)
        return resolve(result)
      })
    })
  }
}

/**
 * @typedef {object} email
 *
 * @property {string}   to        To email address
 * @property {string}   from      From email address
 * @property {string}   subject   Subject text
 * @property {string}   [text]    Basic text version of the email
 * @property {string}   [html]    HTML of the email
 */
