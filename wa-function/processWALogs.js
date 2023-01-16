const fs = require('fs');
const path = require('path');

const parentPath = path.resolve('..', 'Downloads');
const responseJsonPath = path.resolve(parentPath, 'response.json');

const outputPath = path.resolve(parentPath, 'response-output.json');

console.log('Reading file', responseJsonPath);
const responseJson = fs.readFileSync(responseJsonPath, {encoding: 'utf8'});

const responseObj = JSON.parse(responseJson);
const logsOnlyArray = [];

for (const log of responseObj.logs) {
  // delete log.context.temp;
  delete log.request.context.temp;
  delete log.response.context.temp;

  const logsOnlyObj = {
    request_timestamp: log.request_timestamp,
    response: {
      output: {
        generic: log.response.output.generic,
      },
      input: log.response.input,
      user_id: log.response.user_id,
      context: {
        channel: log.response.context.channel,
        chatbotInstanceId: log.response.context.chatbotInstanceId,
        skillId: log.response.context.skillId,
        destination_bot: log.response.context.destination_bot,
        conversation_id: log.response.context.conversation_id,
      }
    }
  }

  logsOnlyArray.push(logsOnlyObj);
}

// fs.writeFileSync(outputPath, JSON.stringify(logsOnlyArray));
fs.writeFileSync(outputPath, JSON.stringify(logsOnlyArray, null ,2));

console.log('File write to', outputPath);
