import { TestBed } from '@angular/core/testing';

import { ManageContactsService } from './manage-contacts.service';

describe('ManageContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageContactsService = TestBed.get(ManageContactsService);
    expect(service).toBeTruthy();
  });
});
