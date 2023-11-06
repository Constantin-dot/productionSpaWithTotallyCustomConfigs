import * as commonCommands from './commands/common';
import * as porofileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(porofileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
// Cypress.Commands.overwrite('intercept', () => {
//   const FIXTURE_MODE = process.env.FIXTURE_MODE;

//   if (FIXTURE_MODE === 'READ') {
//     const fixtureName = req.METHOD + req.url + hash(req.body);
//     readFixture(fixtureName, req.body);
//   }
//   if (FIXTURE_MODE === 'WRITE') {
//     const fixtureName = req.METHOD + req.url + hash(req.body);
//     createFixture(fixtureName, req.body);
//   }
//   if (FIXTURE_MODE === 'API') {
//   }
// });
