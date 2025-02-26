package grouphome.core.component.security;

import org.springframework.session.config.SessionRepositoryCustomizer;
import org.springframework.session.jdbc.JdbcIndexedSessionRepository;

/**
 * セッションクエリのカスタマイズクラス
 */
public class SessionQueryCustomizer implements SessionRepositoryCustomizer<JdbcIndexedSessionRepository> {

    private static final String GET_SESSION_QUERY = """
        SELECT
            s.primary_id,
            s.session_id,
            s.creation_time,
            s.last_access_time,
            s.max_inactive_interval,
            sa.attribute_name,
            sa.attribute_bytes
        FROM %TABLE_NAME% AS s
        LEFT JOIN session_attributes AS sa ON s.primary_id = sa.session_primary_id
        WHERE s.session_id = ?
        """;

    private static final String LIST_SESSIONS_BY_PRINCIPAL_NAME_QUERY = """
        SELECT
            s.primary_id,
            s.session_id,
            s.creation_time,
            s.last_access_time,
            s.max_inactive_interval,
            sa.attribute_name,
            sa.attribute_bytes
        FROM %TABLE_NAME% AS s
        LEFT JOIN session_attributes AS sa ON s.primary_id = sa.session_primary_id
        WHERE s.principal_name = ?
    """;
    private static final String CREATE_SESSION_QUERY = """
        INSERT INTO %TABLE_NAME% (primary_id, session_id, creation_time, last_access_time, max_inactive_interval, expiry_time, principal_name) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """;

    private static final String UPDATE_SESSION_QUERY = """
        UPDATE %TABLE_NAME% SET session_id = ?, last_access_time = ?, max_inactive_interval = ?, expiry_time = ?, principal_name = ?                
        WHERE primary_id = ?
        """;

    private static final String DELETE_SESSION_QUERY = """
        DELETE FROM %TABLE_NAME%
        WHERE session_id = ?
            AND max_inactive_interval >= 0  
        """;

    private static final String DELETE_SESSIONS_BY_EXPIRE_TIME_QUERY = """
        DELETE FROM %TABLE_NAME%
        WHERE expiry_time < ?
        """;

    private static final String CREATE_SESSION_ATTRIBUTE_QUERY = """
        INSERT INTO session_attributes (session_primary_id, attribute_name, attribute_bytes) 
        VALUES (?, ?, ?)
        """;

    private static final String UPDATE_SESSION_ATTRIBUTE_QUERY = """
        UPDATE session_attributes SET attribute_bytes = ?
        WHERE session_primary_id = ?
            AND attribute_name = ?
        """;

    private static final String DELETE_SESSION_ATTRIBUTE_QUERY = """
        DELETE FROM session_attributes
        WHERE session_primary_id = ?
            AND attribute_name = ?
        """;

    @Override
    public void customize(JdbcIndexedSessionRepository sessionRepository) {
        sessionRepository.setTableName("sessions");
        /* Session のCrud Query */
        sessionRepository.setGetSessionQuery(GET_SESSION_QUERY);
        sessionRepository.setListSessionsByPrincipalNameQuery(LIST_SESSIONS_BY_PRINCIPAL_NAME_QUERY );
        sessionRepository.setCreateSessionQuery(CREATE_SESSION_QUERY);
        sessionRepository.setUpdateSessionQuery(UPDATE_SESSION_QUERY);
        sessionRepository.setDeleteSessionQuery(DELETE_SESSION_QUERY);
        sessionRepository.setDeleteSessionsByExpiryTimeQuery(DELETE_SESSIONS_BY_EXPIRE_TIME_QUERY);
        /* Session Attributes のCrud Query */
        sessionRepository.setUpdateSessionAttributeQuery(UPDATE_SESSION_ATTRIBUTE_QUERY);
        sessionRepository.setCreateSessionAttributeQuery(CREATE_SESSION_ATTRIBUTE_QUERY);
        sessionRepository.setDeleteSessionAttributeQuery(DELETE_SESSION_ATTRIBUTE_QUERY);
    }

}
