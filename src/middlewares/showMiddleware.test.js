import showMiddleware from './showMiddleware';

jest.mock('../api');

const show = require('../api').show;
show.mockImplementation(() => new Promise(r => r(['test', 'data'])));

describe('showMiddleware', () => {
  it('Вызывается функция show из модуля ../api если приходит action с типом SHOW_REQUEST', () => {
    const storeMock = {
      dispatch: jest.fn().mockImplementation(() => '')
    };
    showMiddleware(storeMock)(jest.fn())({
      type: 'SHOW_REQUEST',
      payload: {}
    });
    expect(show).toHaveBeenCalledTimes(1);
  });

  it('Если promise resolved то middleware отправляет экшен SHOW_SUCCESS', done => {
    const dispatchMock = jest.fn();
    const storeMock = {
      dispatch: dispatchMock
    };
    showMiddleware(storeMock)(jest.fn())({
      type: 'SHOW_REQUEST',
      payload: {}
    });
    setTimeout(() => {
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      done();
    }, 16);
  });
});
