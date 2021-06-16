"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailProviderInMemory = void 0;

class MailProviderInMemory {
  constructor() {
    this.message = [];
  }

  async sendMail(to, subject, variable, path) {
    this.message.push({
      to,
      subject,
      variable,
      path
    });
  }

}

exports.MailProviderInMemory = MailProviderInMemory;