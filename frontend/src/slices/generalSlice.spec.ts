import { 
  generalSlice,
  GeneralSliceState,
  generalSliceInitialState,
} from './generalSlice';

describe('counter reducer', () => {
  it('should handle initial state', () => {
    expect(generalSlice.reducer(undefined, { type: 'unknown' })).toEqual(generalSliceInitialState);
  });

  // it('should handle increment', () => {
  //   const actual = counterReducer(generalSliceInitialState, increment());
  //   expect(actual.value).toEqual(4);
  // });

  // it('should handle decrement', () => {
  //   const actual = counterReducer(generalSliceInitialState, decrement());
  //   expect(actual.value).toEqual(2);
  // });

  // it('should handle incrementByAmount', () => {
  //   const actual = counterReducer(generalSliceInitialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });
});
