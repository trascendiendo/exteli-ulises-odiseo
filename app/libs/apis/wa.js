import { fbInstance } from "./axiosInstance"

const wa = {
  GetTemplates: async () => 
    await fbInstance.get('message_templates'),
  SendMessage: async ( message ) => {
    await fbInstance.post(
      'messages',
      message
    )
  }
}

export default wa