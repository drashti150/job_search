import { JobPipe } from './job.pipe';

describe('JobPipe', () => {
  it('create an instance', () => {
    const pipe = new JobPipe();
    expect(pipe).toBeTruthy();
  });
});
