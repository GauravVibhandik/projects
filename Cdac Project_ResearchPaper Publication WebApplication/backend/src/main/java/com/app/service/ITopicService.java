package com.app.service;

import java.util.List;

import com.app.dto.TopicDTO;
import com.app.entities.Topic;

public interface ITopicService {
	
	TopicDTO addTopic(TopicDTO topic);
	List<Topic> getAllTopics();
}
