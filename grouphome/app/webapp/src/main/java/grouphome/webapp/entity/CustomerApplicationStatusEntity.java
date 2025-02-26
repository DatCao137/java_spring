package grouphome.webapp.entity;

import java.util.List;
import grouphome.webapp.converter.tenant.NationalRentSubsidyConverter;
import grouphome.webapp.converter.tenant.MunicipalRentSubsidyConverter;
import grouphome.webapp.converter.tenant.IndividualMunicipalityConverter;
import grouphome.webapp.converter.tenant.LifeInsurancePensionConverter;
import grouphome.webapp.converter.tenant.PersonalLiabilityConverter;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerApplicationStatusRequestDto.*;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "d_customer_application_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerApplicationStatusEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 顧客ID
     */
    @Column(name = "customer_id", nullable = false, unique = true)
    private Long customerId;

    /**
     * 援護自治体（受給者証発行元）
     */
    @Column(name = "government", length = 32)
    private String government;

    /**
     * 国GH家賃補助金
     */
    @Convert(converter = NationalRentSubsidyConverter.class)
    @Column(name = "national_rent_subsidy", columnDefinition = "JSON")
    private NationalRentSubsidy nationalRentSubsidy;

    /**
     * 市区町村GH家賃補助金
     */
    @Convert(converter = MunicipalRentSubsidyConverter.class)
    @Column(name = "municipal_rent_subsidy", columnDefinition = "JSON")
    private MunicipalRentSubsidy municipalRentSubsidy;

    /**
     * 自治体単独加算
     */
    @Convert(converter = IndividualMunicipalityConverter.class)
    @Column(name = "individual_municipality", columnDefinition = "JSON")
    private IndividualMunicipality individualMunicipality;

    /**
     * 生保・年金状況
     */
    @Convert(converter = LifeInsurancePensionConverter.class)
    @Column(name = "life_insurance_pension", columnDefinition = "JSON")
    private LifeInsurancePension lifeInsurancePension;

    /**
     * 個人賠償責任保険
     */
    @Convert(converter = PersonalLiabilityConverter.class)
    @Column(name = "personal_liability", columnDefinition = "JSON")
    private PersonalLiability personalLiability;

}