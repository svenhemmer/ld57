export function setGoal(goal: string) {
    localStorage.setItem("goal", goal.toLocaleUpperCase())
}

export function getGoal() {
    return localStorage.getItem("goal")
}