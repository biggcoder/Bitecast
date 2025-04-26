import sqlite3
import logging
from typing import Dict, Any, List, Tuple, Optional
import os

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SQLiteDB:
    def __init__(self, db_path="app.db"):
        """
        Initialize SQLite database connection
        
        Args:
            db_path: Path to SQLite database file
        """
        self.db_path = db_path
        self._create_tables_if_not_exist()
    
    def _get_connection(self):
        """Get a database connection with row factory"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    def _create_tables_if_not_exist(self):
        """Create necessary tables if they don't exist"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            # Create users table
            cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            ''')
            
            # Create summaries table
            cursor.execute('''
            CREATE TABLE IF NOT EXISTS summaries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_url TEXT NOT NULL,
                transcript TEXT,
                summary TEXT NOT NULL,
                ai_model TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
            ''')
            
            conn.commit()
            conn.close()
        except Exception as e:
            logger.error(f"Error creating database tables: {str(e)}")
    
    def execute_query(self, query: str, params: Tuple = ()) -> Optional[List[Dict[str, Any]]]:
        """
        Execute SQL query and return results
        
        Args:
            query: SQL query string
            params: Query parameters
            
        Returns:
            List of dictionaries containing query results or None if error
        """
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(query, params)
            
            if query.strip().upper().startswith("SELECT"):
                rows = cursor.fetchall()
                results = [dict(row) for row in rows]
                conn.close()
                return results
            else:
                conn.commit()
                conn.close()
                return None
        except Exception as e:
            logger.error(f"Database query error: {str(e)}")
            return None
    
    def save_summary(self, source_url: str, transcript: str, summary: str, 
                     ai_model: str, user_id: Optional[int] = None) -> bool:
        """
        Save a summary to the database
        
        Args:
            source_url: URL of the source content
            transcript: Original transcript text
            summary: Generated summary text
            ai_model: Name of the AI model used
            user_id: ID of the user (optional)
            
        Returns:
            True if successful, False otherwise
        """
        try:
            query = """
            INSERT INTO summaries (source_url, transcript, summary, ai_model, user_id)
            VALUES (?, ?, ?, ?, ?)
            """
            
            self.execute_query(query, (source_url, transcript, summary, ai_model, user_id))
            return True
        except Exception as e:
            logger.error(f"Error saving summary: {str(e)}")
            return False
    
    def get_user_summaries(self, user_id: int) -> List[Dict[str, Any]]:
        """
        Get all summaries for a specific user
        
        Args:
            user_id: ID of the user
            
        Returns:
            List of summaries
        """
        query = "SELECT * FROM summaries WHERE user_id = ? ORDER BY created_at DESC"
        results = self.execute_query(query, (user_id,))
        return results if results else []
