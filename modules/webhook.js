const discord = require('discord.js')
const fs = require('fs')
const yaml = require('js-yaml')
const webhookConfig = yaml.safeLoad(fs.readFileSync('./config/webhook.yml', 'utf8'))
const webhookClient = new discord.WebhookClient(
  webhookConfig.webhookID,
  webhookConfig.webhookToken
)
/**
 * Send message through config webhook.
 * @param {string} text The content to send to the webhook.
 * @throws {ReferenceError} Will throw an error if text has no content.
 */
module.exports = function webhook (text) {
  if (text) {
    webhookClient.send(text).catch(error => { throw new Error(error) })
  } else {
    throw new ReferenceError('text is not defined')
  }
}
