import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { AcchackMedicinsight } from '../src/AcchackMedicinsight.js';
import '../acchack-medicinsight.js';

storiesOf('acchack-medicinsight', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(AcchackMedicinsight))
  .add(
    'Alternative Title',
    () => html`
      <acchack-medicinsight .title=${'Something else'}></acchack-medicinsight>
    `,
  );
