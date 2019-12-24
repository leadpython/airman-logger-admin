export default class Result {
  constructor ({ data, status=true, message='' }) {
    this.data = data
    this.status = status
    this.message = message
  }
}