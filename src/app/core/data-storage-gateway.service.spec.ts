import { TestBed, inject } from '@angular/core/testing';

import { DataStorageGatewayService } from './data-storage-gateway.service';

describe('DataStorageGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStorageGatewayService]
    });
  });

  it('should be created', inject([DataStorageGatewayService], (service: DataStorageGatewayService) => {
    expect(service).toBeTruthy();
  }));
});
