import React, { useState } from 'react';
import BackButton from '../BackButton';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: true },
    { id: 3, text: 'Finish project', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

    return (
      <>
          <BackButton/>
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-purple-300">

        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 text-center relative">
         
          <h1 className="text-3xl font-bold text-white mt-8">Cartoon Todo List</h1>
          <p className="text-purple-100 mt-2">Get things done with style!</p>
        </div>

        {/* Add Todo Section */}
        <div className="p-4 bg-blue-50 border-b-2 border-blue-100">
          <div className="flex gap-2">
            <input
  type="text"
  value={newTodo}
  onChange={(e) => setNewTodo(e.target.value)}
  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
  placeholder="Add a new task..."
  className="flex-1 px-4 py-3 rounded-full border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
/>

            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-5 py-3 rounded-full font-bold shadow-md hover:from-green-500 hover:to-teal-500 transition-all transform hover:scale-105 active:scale-95"
            >
              Add
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 bg-yellow-50 flex justify-between border-b-2 border-yellow-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{activeCount}</div>
            <div className="text-xs text-purple-400">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-xs text-green-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{todos.length}</div>
            <div className="text-xs text-pink-400">Total</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className=" bg-pink-50 flex justify-center gap-2 border-b-2 border-pink-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold ${filter === 'all' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-bold ${filter === 'active' ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-500'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm font-bold ${filter === 'completed' ? 'bg-green-400 text-white' : 'bg-white text-green-500'}`}
          >
            Completed
          </button>
        </div>

        {/* Todo List */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-5xl mb-4">📭</div>
              <p>No tasks found!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-purple-100 shadow-sm'}`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${todo.completed ? 'bg-green-500' : 'bg-gray-200'} transition-colors`}
                    >
                      {todo.completed && (
                        <span className="text-white text-lg">✓</span>
                      )}
                    </button>
                    <span
                      className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

    
      </div>
    </div>
      </>
  );
};

export default TodoList;
