package grouphome.webapp.repository.define.customer;

import grouphome.webapp.repository.define.blc_common.PagerRepository;

public interface RequestInfoDetailRepositoryCustom  extends PagerRepository {
    Object getCustomerRequestItem(Long id);
}
