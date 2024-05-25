import EachTask from "./EachTask"

const TodoTable = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th className="bg-secondary py-3 text-lg text-secondary-content">Tasks</th>
                        <th className="bg-secondary py-3 text-lg text-secondary-content">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <EachTask key={task.id} task={task} />
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TodoTable