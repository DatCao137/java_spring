package grouphome.webapp.service.specification;

import grouphome.webapp.entity.CustomerInfoEntity;
import grouphome.webapp.entity.CustomerUnitEntity;

import grouphome.webapp.entity.OfficeUnitEntity;
import grouphome.webapp.entity.OfficeBranchEntity;


import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;
import java.util.Arrays;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.JoinType;

public class TenantSpecification {
    public static Specification<CustomerInfoEntity> isActive() {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            return criteriaBuilder.isNull(root.get("deletedAt"));
        };
    }

    public static Specification<CustomerInfoEntity> filterByName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) {
                return criteriaBuilder.conjunction();
            } else if (name.trim().isEmpty()) {
                return criteriaBuilder.or(
                    criteriaBuilder.equal(root.get("name"), ""), 
                    criteriaBuilder.isNull(root.get("name"))
                );
            }
            return criteriaBuilder.like(root.get("name"), "%" + name + "%");
        };
    }

    public static Specification<CustomerInfoEntity> filterByNameGana(String nameGana) {
        return (root, query, criteriaBuilder) -> {
            if (nameGana == null) {
                return criteriaBuilder.conjunction();
            } else if (nameGana.trim().isEmpty()) {
                return criteriaBuilder.or(
                    criteriaBuilder.equal(root.get("nameGana"), ""), 
                    criteriaBuilder.isNull(root.get("nameGana"))
                );
            }
            return criteriaBuilder.like(root.get("nameGana"), "%" + nameGana + "%");
        };
    }

    public static Specification<CustomerInfoEntity> filterByNickname(String nickname) {
        return (root, query, criteriaBuilder) -> {
            if (nickname == null) {
                return criteriaBuilder.conjunction();
            } else if (nickname.trim().isEmpty()) {
                return criteriaBuilder.or(
                    criteriaBuilder.equal(criteriaBuilder.function("JSON_EXTRACT", String.class, root.get("personal"), criteriaBuilder.literal("$.nickname")), ""), 
                    criteriaBuilder.isNull(criteriaBuilder.function("JSON_EXTRACT", String.class, root.get("personal"), criteriaBuilder.literal("$.nickname")))
                );
            }
            return criteriaBuilder.like(
                    criteriaBuilder.function("JSON_EXTRACT", String.class, root.get("personal"), criteriaBuilder.literal("$.nickname")),
                    "%" + nickname + "%"
            );
        };
    }

    public static Specification<CustomerInfoEntity> filterBySex(List<String> sexList) {
        return (root, query, criteriaBuilder) -> {
            Expression<String> sexExpr = criteriaBuilder.function(
                    "JSON_EXTRACT", String.class,
                    root.get("personal"),
                    criteriaBuilder.literal("$.sex"));

            if (sexList == null) {
                return criteriaBuilder.conjunction();
            } 

            if ( sexList.isEmpty() ) {
                List<String> sexValues = Arrays.asList("1", "2"); 
                return criteriaBuilder.not(sexExpr.in(sexValues));
            }

            return sexExpr.in(sexList);
        };
    }

    public static Specification<CustomerInfoEntity> filterByAge(List<String> YMs) {
         return (root, query, criteriaBuilder) -> {

            if (YMs == null) {
                return criteriaBuilder.conjunction();
            } else if (YMs.isEmpty()) {
                Expression<String> _birthDayExpr = criteriaBuilder.function(
                    "JSON_UNQUOTE", String.class,
                    criteriaBuilder.function("JSON_EXTRACT", String.class, root.get("personal"), criteriaBuilder.literal("$.birthDay"))
                );

                return criteriaBuilder.equal(_birthDayExpr, "null");
            }

            Expression<String> birthDayExpr = criteriaBuilder.function(
                    "JSON_EXTRACT", String.class,
                    root.get("personal"),
                    criteriaBuilder.literal("$.birthDay"));

            Expression<Object> birthDayChecked = criteriaBuilder.selectCase()
                    .when(criteriaBuilder.isNull(birthDayExpr), criteriaBuilder.literal("1900-01"))
                    .otherwise(birthDayExpr);

            Expression<String> yearMonthExpr = criteriaBuilder.function("DATE_FORMAT", String.class, birthDayChecked, criteriaBuilder.literal("%Y-%m"));

            return yearMonthExpr.in(YMs);
        };
    }

    public static Specification<CustomerInfoEntity> filterByStatus(List<Integer> statusList) {
        return (root, query, criteriaBuilder) -> {
            Join<CustomerInfoEntity, CustomerUnitEntity> customerUnitJoin = root.join("customerUnit", JoinType.LEFT);
            if (statusList == null) {
                return criteriaBuilder.conjunction();
            } else if (statusList.isEmpty()) {
                return criteriaBuilder.or(
                    criteriaBuilder.isNull(customerUnitJoin),
                    criteriaBuilder.isNull(customerUnitJoin.get("status"))
                );
            }
            return customerUnitJoin.get("status").in(statusList);
        };
    }

    public static Specification<CustomerInfoEntity> filterByMoveInAt(LocalDate moveInAt) {
        return (root, query, criteriaBuilder) -> {
            if (moveInAt == null) {
                return criteriaBuilder.conjunction();
            }

            Expression<LocalDate> moveInAtExpr = root.get("customerUnit").get("moveInAt");
            return criteriaBuilder.equal(moveInAtExpr, moveInAt);
        };
    }

    public static Specification<CustomerInfoEntity> filterByLeavingAt(LocalDate leavingAt) {
        return (root, query, criteriaBuilder) -> {
            if (leavingAt == null) {
                return criteriaBuilder.conjunction();
            }

            Expression<LocalDate> leavingAtExpr = root.get("customerUnit").get("leavingAt");
            return criteriaBuilder.equal(leavingAtExpr, leavingAt);
        };
    }

    public static Specification<CustomerInfoEntity> filterByCategory(List<Integer> categoryList) {
        return (root, query, criteriaBuilder) -> {
            if (categoryList == null) {
                return criteriaBuilder.conjunction();
            } else if (categoryList.isEmpty()) {
                return criteriaBuilder.isNull(root.get("category"));
            }
            return root.get("category").in(categoryList);
        };
    }

    public static Specification<CustomerInfoEntity> filterByRoomNo(String roomNo) {
        return (root, query, criteriaBuilder) -> {
            Join<CustomerInfoEntity, CustomerUnitEntity> customerUnitJoin = root.join("customerUnit", JoinType.LEFT);
            if (roomNo == null) {
                return criteriaBuilder.conjunction();
            } else if (roomNo.trim().isEmpty()) {
                return criteriaBuilder.or(
                    criteriaBuilder.isNull(customerUnitJoin),
                    criteriaBuilder.isNull(customerUnitJoin.get("roomNo")),
                    criteriaBuilder.equal(customerUnitJoin.get("roomNo"), "")
                );
            }
            return criteriaBuilder.like(customerUnitJoin.get("roomNo"), "%" + roomNo + "%");
        };
    }

    public static Specification<CustomerInfoEntity> filterByBranchName(String branchName) {
        return (root, query, criteriaBuilder) -> {
            Join<CustomerInfoEntity, CustomerUnitEntity> customerUnitJoin = root.join("customerUnit", JoinType.LEFT);
            Join<CustomerUnitEntity, OfficeBranchEntity> officeBranchJoin = customerUnitJoin.join("officeBranch", JoinType.LEFT);
            if (branchName == null) {
                return criteriaBuilder.conjunction();
            } else if (branchName.trim().isEmpty()) {
                return criteriaBuilder.or(
                    criteriaBuilder.isNull(customerUnitJoin),
                    criteriaBuilder.isNull(officeBranchJoin),
                    criteriaBuilder.isNull(officeBranchJoin.get("name")),
                    criteriaBuilder.equal(officeBranchJoin.get("name"), "")
                );
            }
            return criteriaBuilder.like(officeBranchJoin.get("name"), "%" + branchName + "%");
        };
    }


    public static Specification<CustomerInfoEntity> filterByUnitName(String unitName) {
        return (root, query, criteriaBuilder) -> {
            Join<CustomerInfoEntity, CustomerUnitEntity> customerUnitJoin = root.join("customerUnit", JoinType.LEFT);
            Join<CustomerUnitEntity, OfficeUnitEntity> officeUnitJoin = customerUnitJoin.join("unit", JoinType.LEFT);
            if (unitName == null) {
                return criteriaBuilder.conjunction();
            } else if (unitName.trim().isEmpty()) {
                return criteriaBuilder.or(
                    criteriaBuilder.isNull(customerUnitJoin),
                    criteriaBuilder.isNull(officeUnitJoin),
                    criteriaBuilder.isNull(officeUnitJoin.get("name")),
                    criteriaBuilder.equal(officeUnitJoin.get("name"), "")
                );
            }
            return criteriaBuilder.like(officeUnitJoin.get("name"), "%" + unitName + "%");
        };
    }

    public static Specification<CustomerInfoEntity> getSpecification(
            String name, String nameGana, String nickname,
            List<String> sexList, List<String> YMs, List<Integer> statusList,
            LocalDate moveInAt, LocalDate leavingAt, List<Integer> categoryList,
            String roomNo, String brunchName, String unitName
    ) {
        return Specification.where(TenantSpecification.isActive())
                .and(TenantSpecification.filterByName(name))
                .and(TenantSpecification.filterByNameGana(nameGana))
                .and(TenantSpecification.filterByNickname(nickname))
                .and(TenantSpecification.filterBySex(sexList))
                .and(TenantSpecification.filterByAge(YMs))
                .and(TenantSpecification.filterByStatus(statusList))
                .and(TenantSpecification.filterByMoveInAt(moveInAt))
                .and(TenantSpecification.filterByLeavingAt(leavingAt))
                .and(TenantSpecification.filterByCategory(categoryList))
                .and(TenantSpecification.filterByRoomNo(roomNo))
                .and(TenantSpecification.filterByBranchName(brunchName))
                .and(TenantSpecification.filterByUnitName(unitName));
    }
}
