import { createElement as create_element, useState as use_state } from 'react';
import {
  Dialog as dialog,
  DialogTrigger as dialog_trigger,
  DialogPortal as dialog_portal,
  DialogOverlay as dialog_overlay,
  DialogTitle as dialog_title,
  DialogDescription as dialog_description,
  DialogClose as dialog_close,
} from './ui/dialog';
import { Content as dialog_content } from '@radix-ui/react-dialog';
import './code-inspector.css';

const notes = [
  ['01', 'renew the lease', 'ops.renew(transaction.id)', 'The coordinator asks to extend its lease: the limited time it owns this transaction. A successful renewal lets the caller continue with the returned record.'],
  ['02', 'resolve uncertainty', 'read_current(transaction.id, ops)', 'A failed renewal does not prove the write failed. Read the stored record consistently to find out what actually happened. If that read also fails, return the error instead of guessing.'],
  ['03', 'check ownership', 'ops.matches_fence(current)', 'Before returning an unfinished transaction, check that its coordinator still matches. A stale worker receives coordinator_fenced. Completed or aborted records can be returned without resuming their work.'],
];

export default function code_inspector() {
  const [excerpt, set_excerpt] = use_state('');
  return create_element(dialog, {
    onOpenChange: (open: boolean) => {
      if (open) set_excerpt(document.querySelector('.hero-code-atmosphere pre')?.textContent ?? '');
    },
  },
  create_element(dialog_trigger, { className: 'inspect-code-trigger' }, 'inspect code', create_element('span', { 'aria-hidden': true }, '</>')),
  create_element(dialog_portal, null,
    create_element(dialog_overlay, { className: 'inspect-code-overlay' }),
    create_element(dialog_content, { className: 'inspect-code-dialog' },
      create_element('header', { className: 'inspect-code-heading' },
        create_element('p', null, 'behind the background'),
        create_element(dialog_title, null, 'when a trade loses its coordinator'),
        create_element(dialog_description, null, 'A closer look at the Luau excerpt in the hero: renewing ownership, resolving uncertain writes, and rejecting stale workers.'),
      ),
      create_element(dialog_close, { className: 'inspect-code-close', 'aria-label': 'close code inspector' }, 'close'),
      create_element('div', { className: 'inspect-code-body' },
        create_element('section', { className: 'inspect-code-source', 'aria-label': 'trading protocol excerpt' },
          create_element('div', { className: 'inspect-code-file' }, 'trade_protocol · luau'),
          create_element('pre', { tabIndex: 0, 'aria-label': 'code excerpt, scroll horizontally to read long lines' }, create_element('code', null, excerpt)),
          create_element('p', { className: 'inspect-code-caption' }, 'Excerpt from the trading protocol. Supporting helpers and the rest of the transaction flow are omitted.'),
        ),
        create_element('ol', { className: 'inspect-code-notes' }, ...notes.map(([number, title, expression, explanation]) =>
          create_element('li', { key: number },
            create_element('span', null, number),
            create_element('h3', null, title),
            create_element('code', null, expression),
            create_element('p', null, explanation),
          ),
        )),
      ),
    ),
  ));
}
