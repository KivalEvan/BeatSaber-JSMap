import logger, { Logger } from '../logger.ts';
import { assertEquals } from './deps.ts';

Deno.test('Set log level via accessor', () => {
   logger.logLevel = 0;
   assertEquals(logger.logLevel, 0);

   logger.logLevel = 1;
   assertEquals(logger.logLevel, 1);

   logger.logLevel = 2;
   assertEquals(logger.logLevel, 2);

   logger.logLevel = 3;
   assertEquals(logger.logLevel, 3);

   logger.logLevel = 4;
   assertEquals(logger.logLevel, 4);

   logger.logLevel = 5;
   assertEquals(logger.logLevel, 5);
});

Deno.test('Set log level via method', () => {
   logger.setLevel(0);
   assertEquals(logger.logLevel, 0);

   logger.setLevel(1);
   assertEquals(logger.logLevel, 1);

   logger.setLevel(2);
   assertEquals(logger.logLevel, 2);

   logger.setLevel(3);
   assertEquals(logger.logLevel, 3);

   logger.setLevel(4);
   assertEquals(logger.logLevel, 4);

   logger.setLevel(5);
   assertEquals(logger.logLevel, 5);
});

Deno.test('Print log level', () => {
   logger.setLevel(0);

   logger.verbose('Printing verbose');
   logger.debug('Printing debug');
   logger.info('Printing info');
   logger.warn('Printing warn');
   logger.error('Printing error');

   logger.tVerbose(['test', 'logger'], 'Printing verbose');
   logger.tDebug(['test', 'logger'], 'Printing debug');
   logger.tInfo(['test', 'logger'], 'Printing info');
   logger.tWarn(['test', 'logger'], 'Printing warn');
   logger.tError(['test', 'logger'], 'Printing error');
});

Deno.test('Custom logger', () => {
   const cLogger = new Logger();

   cLogger.setLevel(0);

   cLogger.tVerbose(['test', 'cLogger'], 'Printing verbose');
   cLogger.tDebug(['test', 'cLogger'], 'Printing debug');
   cLogger.tInfo(['test', 'cLogger'], 'Printing info');
   cLogger.tWarn(['test', 'cLogger'], 'Printing warn');
   cLogger.tError(['test', 'cLogger'], 'Printing error');

   cLogger.untagged = 'custom stuff';
   assertEquals(cLogger.untagged, 'custom stuff');
   cLogger.tagPrint = (tags: string[]) => `| ${tags.join(' > ')} |`;

   cLogger.verbose('Printing verbose');
   cLogger.debug('Printing debug');
   cLogger.info('Printing info');
   cLogger.warn('Printing warn');
   cLogger.error('Printing error');
});
