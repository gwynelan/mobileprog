import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

const TodoApp = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'UI Design', time: '09:00 AM - 11:00 AM' },
    { id: '2', title: 'Web Development', time: '11:30 AM - 12:30 PM' },
    { id: '3', title: 'Elective', time: '02:00 PM - 03:00 PM' },
    { id: '4', title: 'Software Engineer', time: '03:30 PM - 06:00 PM' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle && newTaskTime) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        time: newTaskTime,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskTime('');
    } else {
      Alert.alert('Please fill in both fields');
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setNewTaskTitle(taskToEdit.title);
    setNewTaskTime(taskToEdit.time);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskCardContent}>
        <View style={styles.taskInfoContainer}>
          <MaterialIcons name="assignment" size={24} style={styles.taskIcon} />
          <Text style={styles.taskTitle}>{item.title}</Text>
        </View>
        <Text style={styles.taskTime}>{item.time}</Text>
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(item.id)}>
          <MaterialIcons name="edit" size={24} color="#6200ee" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <MaterialIcons name="delete" size={24} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Today's Tasks</Text>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} />
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>
      <View style={styles.progressSummary}>
        <Text style={styles.progressText}>Today's Progress Summary</Text>
        <Text style={styles.taskCount}>{filteredTasks.length} Tasks</Text>
        <ProgressBar progress={filteredTasks.length > 0 ? 0.4 : 0} color="#6200ee" style={styles.progressBar} />
        <Text style={styles.progressPercent}>Progress 40%</Text>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskContainer}
      />
      <View style={styles.addTaskContainer}>
        <TextInput
          placeholder="Task Title"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Time"
          value={newTaskTime}
          onChangeText={setNewTaskTime}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={24} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <MaterialIcons name="calendar-today" size={24} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MessagePage')}>
          <MaterialIcons name="chat" size={24} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="account-circle" size={24} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa', // Soft light background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#343a40', // Dark gray color for text
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6', // Light gray for search bar
    paddingBottom: 4,
  },
  searchInput: {
    padding: 8,
    width: 120,
    marginLeft: 8,
    fontSize: 16,
    color: '#495057', // Dark gray for input text
  },
  progressSummary: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff', // White for summary box
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6200ee', // Primary color for headings
  },
  taskCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee', // Primary color for count
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  taskContainer: {
    flex: 1,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12, // More rounded corners for task cards
    backgroundColor: '#ffffff', // White for cards
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  taskCardContent: {
    flex: 1,
    flexDirection: 'column', // Ensure vertical arrangement
    justifyContent: 'space-between', // Align title and time
  },
  taskInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    marginRight: 8,
    color: '#6200ee', // Primary color for icons
  },
  taskTitle: {
    fontSize: 20, // Increased font size for title
    fontWeight: '600',
    color: '#343a40', // Dark gray for title text
  },
  taskTime: {
    fontSize: 14,
    color: '#868e96', // Muted color for time
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTaskContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#ffffff', // White for inputs
  },
  addTaskButton: {
    backgroundColor: '#6200ee', // Primary color for button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff', // White text for button
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6', // Light gray for footer border
  },
  footerIcon: {
    color: '#495057', // Dark gray for footer icons
  },
});

export default TodoApp;
