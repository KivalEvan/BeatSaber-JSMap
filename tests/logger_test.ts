import logger from '../logger.ts';
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

    logger.logLevel = -1;
    assertEquals(logger.logLevel, 0);

    logger.logLevel = 6;
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

    logger.setLevel(-1);
    assertEquals(logger.logLevel, 0);

    logger.setLevel(6);
    assertEquals(logger.logLevel, 5);
});

Deno.test('Print log level', () => {
    logger.setLevel(0);

    logger.verbose('Printing verbose');
    logger.debug('Printing debug');
    logger.info('Printing info');
    logger.warn('Printing warn');
    logger.error('Printing error');
});
