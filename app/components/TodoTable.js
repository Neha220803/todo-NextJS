import EachTask from "./EachTask"

const TodoTable = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th className="bg-secondary py-3 sm:text-xl text-lg text-secondary-content"> Tasks</th>
                        <th className="bg-secondary py-3 sm:text-xl text-lg text-secondary-content hidden sm:table-cell text-center">Deadline</th>
                        <th className="bg-secondary py-3 sm:text-xl text-lg text-secondary-content text-center">Actions</th>
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