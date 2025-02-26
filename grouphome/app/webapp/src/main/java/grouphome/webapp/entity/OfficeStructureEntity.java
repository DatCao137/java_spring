package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import grouphome.webapp.converter.office.BranchContentConverter;
import grouphome.webapp.converter.office.structure.StructureServiceConverter;
import grouphome.webapp.converter.office.structure.StructureLifeSupporterConverter;
import grouphome.webapp.converter.office.structure.StructureWelfareWorkerConverter;
import grouphome.webapp.converter.office.structure.StructureNurseConverter;
import grouphome.webapp.converter.office.structure.StructureVisitingContractConverter;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto.*;

@Entity
@Table(name = "d_office_structure")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeStructureEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 事務所
     */
    @Column(name = "branch_id", nullable = false, unique = true)
    private Long branchId; 

    /**
     * 管理者
     */
    @Column(name = "manager_name", length = 64)
    private String managerName; 

    /**
     * サービス管理責任者1
     */
    @Convert(converter = StructureServiceConverter.class)
    @Column(name = "service1", columnDefinition = "JSON")
    private Service service1;

    /**
     * サービス管理責任者2
     */
    @Convert(converter = StructureServiceConverter.class)
    @Column(name = "service2", columnDefinition = "JSON")
    private Service service2;

    /**
     * 常勤生活支援員
     */
    @Convert(converter = StructureLifeSupporterConverter.class)
    @Column(name = "life_supporter", columnDefinition = "JSON")
    private LifeSupporter lifeSupporter; 

    /**
     * 常勤福祉士
     */
    @Convert(converter = StructureWelfareWorkerConverter.class)
    @Column(name = "welfare_worker", columnDefinition = "JSON")
    private WelfareWorker welfareWorker; 

    /**
     * 正看護師
     */
    @Convert(converter = StructureNurseConverter.class)
    @Column(name = "nurse", columnDefinition = "JSON")
    private Nurse nurse; 

    /**
     * 訪看契約
     */
    @Convert(converter = StructureVisitingContractConverter.class)
    @Column(name = "visiting_contract", columnDefinition = "JSON")
    private VisitingContract visitingContract; 
}