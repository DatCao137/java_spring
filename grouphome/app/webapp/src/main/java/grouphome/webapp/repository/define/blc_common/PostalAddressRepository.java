package grouphome.webapp.repository.define.blc_common;

import grouphome.webapp.entity.BlcPostalAddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostalAddressRepository extends JpaRepository<BlcPostalAddressEntity, Long> {
    List<BlcPostalAddressEntity> findByPostNoStartingWith(String postNoStart);

    List<BlcPostalAddressEntity> findByPostNo(String postNo);

    List<BlcPostalAddressEntity> findByPostNoStartingWithAndPref(String postNo, String pref);

    List<BlcPostalAddressEntity> findByPostNoStartingWithAndPrefAndCity(String postNo, String pref, String city);

    List<BlcPostalAddressEntity> findByPostNoStartingWithAndPrefAndCityAndTown(String postNo, String pref, String city, String town);

    List<BlcPostalAddressEntity> findByPref(String pref);
}
