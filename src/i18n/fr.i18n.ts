import { TransactionCategoryEnum } from "../domain/meta/enums/expense-tracker/category";
import { TransactionTypeEnum } from "../domain/meta/enums/expense-tracker/type";
import { TaskPriorityEnum } from "../domain/meta/enums/tasks-board/priority";
import { TaskStatusEnum } from "../domain/meta/enums/tasks-board/status";

export default {
  changingLanguage: "Changement de langue…",
  delete: "Supprimer",

  todo: {
    addNewTask: "Ajouter une nouvelle tâche",
    add: "Ajouter",
    noTasks: "Aucune tâche pour le moment, commencez par en ajouter une",
    noTasksWithFilter:
      "Aucune tâche, mettez à jour vos critères de filtre et réessayez",
    inputError: "Veuillez saisir une tâche",
    taskExistsError: "La tâche existe déjà et n'est pas encore terminée",
    oldToNew: "Ancien → Nouveau",
    newToOld: "Nouveau → Ancien",
    filter: "Filtrer",
    applyFilter: "Appliquer le filtre",
    sort: "Trier",
    desc: "Décroissant",
    asc: "Croissant",
    done: "Terminé",
    notDone: "Non terminé",
    all: "Tous",
    searchByText: "Rechercher par texte",
    resetFilter: "Réinitialiser le filtre",
  },

  weather: {
    title: "Météo",
    subtitle:
      "Recherchez une ville pour obtenir les données météo en temps réel",
    searchPlaceholder: "Entrez le nom d'une ville…",
    feelsLike: "Ressenti",
    humidity: "Humidité",
    wind: "Vent",
    pressure: "Pression",
    visibility: "Visibilité",
    sunrise: "Lever du soleil",
    sunset: "Coucher du soleil",
    cityNotFound: "Ville introuvable. Vérifiez le nom et réessayez.",
    fetchError:
      "Échec de récupération des données météo. Veuillez réessayer plus tard.",
    emptyState:
      "Entrez le nom d'une ville ci-dessus pour voir la météo actuelle",
  },

  expenseTracker: {
    createNewTransaction: "Créer une nouvelle transaction",
    filter: "Filtrer",
    create: "Créer",
    close: "Fermer",
    apply: "Appliquer",
    reset: "Réinitialiser",
    title: "Titre",
    category: "Catégorie",
    type: "Type",
    amount: "Montant",
    date: "Date",
    actions: "Actions",
    AllFieldsAreRequired: "Tous les champs sont obligatoires",
    save: "Enregistrer",
    editTransaction: "Modifier la transaction",
    noTransactions: "Aucune transaction pour le moment !",
    noTransactionsSub: "Commencez par ajouter une nouvelle transaction",
    noTransactionsWithFilter: "Aucune donnée trouvée !",
    noTransactionsWithFilterSub:
      "Mettez à jour vos critères de filtre et réessayez",
    amountWithCurrency: (amount: number, currency: string) =>
      `${amount} ${currency}`,
    amountInCurrency: (currency: string) => `Montant en (${currency})`,
    totalIncome: "Revenu total",
    totalExpense: "Dépense totale",
    incomeByCategory: "Revenus par catégorie",
    expenseByCategory: "Dépenses par catégorie",
    totalOverview: "Vue d'ensemble totale",
    balance: "Solde",
    income: "Revenu",
    expense: "Dépense",
    noDateToDisplay: "Aucune donnée à afficher",
  },

  tasksBoard: {
    title: "Tableau des tâches",
    todo: "À FAIRE",
    inProgress: "En cours",
    review: "Révision",
    done: "Terminé",
    noTasks: "Aucune tâche",
    addNewTask: "Ajouter une nouvelle tâche",
    add: "Ajouter",
    taskAddedSuccessfully: "Tâche ajoutée avec succès",
    taskTitle: "Titre de la tâche",
    taskDescription: "Description de la tâche",
    assignedTo: "Assigné à",
    estimatedTime: "Temps estimé (en heures)",
    priority: "Priorité",
    status: "Statut",
    estimatedTimeHours: (hours: number) => `${hours} h`,
    moveToNextStep: "Passer à l'étape suivante",
    taskMovedSuccessfully: "Tâche déplacée avec succès",
    taskDeletedSuccessfully: "Tâche supprimée avec succès",
    edit: "Modifier",
    editTask: "Modifier la tâche",
    save: "Enregistrer",
    taskUpdatedSuccessfully: "Tâche mise à jour avec succès",
    filter: "Filtrer",
    applyFilter: "Appliquer le filtre",
    resetFilter: "Réinitialiser le filtre",
    searchByText: "Rechercher par texte",
    filterByPriority: "Filtrer par priorité",
    filterByAssignee: "Filtrer par responsable",
    noTasksWithFilter:
      "Aucune tâche, mettez à jour vos critères de filtre et réessayez",
  },

  enums: {
    TransactionTypeEnum: {
      [TransactionTypeEnum.Income]: "Revenu",
      [TransactionTypeEnum.Expense]: "Dépense",
    },

    TransactionCategoryEnum: {
      [TransactionCategoryEnum.Food]: "Alimentation",
      [TransactionCategoryEnum.Transportation]: "Transport",
      [TransactionCategoryEnum.Housing]: "Logement",
      [TransactionCategoryEnum.Utilities]: "Services publics",
      [TransactionCategoryEnum.Salaries]: "Salaires",
      [TransactionCategoryEnum.Investments]: "Investissements",
      [TransactionCategoryEnum.Shopping]: "Achats",
      [TransactionCategoryEnum.Entertainment]: "Divertissement",
    },

    TaskPriorityEnum: {
      [TaskPriorityEnum.Low]: "Faible",
      [TaskPriorityEnum.Medium]: "Moyenne",
      [TaskPriorityEnum.High]: "Élevée",
    },

    TaskStatusEnum: {
      [TaskStatusEnum.ToDo]: "À faire",
      [TaskStatusEnum.InProgress]: "En cours",
      [TaskStatusEnum.Review]: "Révision",
      [TaskStatusEnum.Done]: "Terminé",
    },
  },
};
