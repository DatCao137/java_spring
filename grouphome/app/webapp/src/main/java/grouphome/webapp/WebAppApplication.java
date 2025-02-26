package grouphome.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

/**
 * Application Boot Class
 */
@EntityScan(basePackages={ "grouphome.webapp", "grouphome.core" })
@SpringBootApplication(scanBasePackages = { "grouphome.webapp", "grouphome.core" })
public class WebAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebAppApplication.class, args);
	}

}
