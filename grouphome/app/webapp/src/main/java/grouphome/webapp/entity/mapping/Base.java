package grouphome.webapp.entity.mapping;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Base {
    @Id
    private Long id;
}
