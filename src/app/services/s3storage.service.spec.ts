import { TestBed } from '@angular/core/testing';

import { S3storageService } from './s3storage.service';

describe('S3storageService', () => {
  let service: S3storageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S3storageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
