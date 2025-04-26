from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.models.base import Base

class Summary(Base):
    __tablename__ = "summaries"
    
    id = Column(Integer, primary_key=True, index=True)
    source_url = Column(String(255), index=True)
    transcript = Column(Text)
    summary = Column(Text)
    ai_model = Column(String(50))
    created_at = Column(DateTime, server_default=func.now())
    user_id = Column(Integer, index=True, nullable=True)
    
    def __repr__(self):
        return f"<Summary(id={self.id}, source={self.source_url[:30]}...)>"
