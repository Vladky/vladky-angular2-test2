/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleserviceService } from './roleservice.service';

describe('RoleserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleserviceService]
    });
  });

  it('should ...', inject([RoleserviceService], (service: RoleserviceService) => {
    expect(service).toBeTruthy();
  }));
});
