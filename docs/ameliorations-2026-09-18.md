# Améliorations acquisition — 18 septembre 2026

## Périmètre validé

Les quatre premiers points de l’audit : réception des demandes, cohérence de
l’offre, accès au contact, carrousel et chargement mobile. Conservation du design,
de l’emplacement des avis, de l’animation approuvée et des photographies originales.

## Vérifications et modifications externes

- Un seul envoi réel depuis le formulaire de production, identifié
  `PD-20260918-01`, explicitement marqué comme test sans réservation.
- FormSubmit a confirmé l’envoi ; Hedi a confirmé la réception dans la boîte
  principale de `photoetdragee@gmail.com` (pas dans les spams).
- Mariages.net : tarif minimum et maximum à 1 600 €, 50 tirages, clé USB,
  livraison sous un mois, recommandation de réserver 12 mois avant et déplacements
  inclus. Les conditions du site ont été retenues conformément à la confirmation
  d’Hedi. Aucune disponibilité annuelle non confirmée n’a été ajoutée.
- Les modifications de la fiche Mariages.net sont enregistrées ; le tarif,
  les 50 tirages et le délai conseillé de réservation sont visibles publiquement.

## Modifications du site préparées localement

- Accès « Vérifier ma date » dès le premier écran mobile et ordinateur, dans la
  navigation, autour de l’offre et des avis, et sur les pages de reportage.
- Adresse email et téléphone directement cliquables, validation des vraies dates
  du calendrier, saisie mobile lisible et bouton d’envoi plus facile à toucher.
- Page de remerciement `/merci/`, exclue du sitemap et de l’indexation, et
  configuration d’une réponse automatique. Ces nouveaux éléments n’ont pas
  encore été testés par un envoi en production : ils nécessitent le déploiement.
  La protection antirobot FormSubmit reste active.
- Carrousel : nettoyage des animations précédentes, sélection des quatre avis,
  pause/lecture, pause hors écran et pendant la consultation au clavier/survol,
  respect de la préférence de réduction des animations et adaptation au redimensionnement.
- Suppression de la duplication infinie de la galerie mobile : les 45 photos
  restent présentes et le pied de page redevient accessible.
- Pas de téléchargement des photos de la version masquée (mobile/ordinateur),
  priorité aux quatre premières photos mobiles, dimensions et sources responsive
  conservées. Aucun fichier du portfolio n’a été modifié ou recompressé.
- Polices existantes servies localement (licences incluses), chargement de la
  police éditoriale seulement sur la page concernée, défilement natif sur mobile.
- Écran de chargement supprimé de l’accueil et du parcours de contact ; ailleurs,
  il ne masque pas la version mobile et possède des délais de sécurité.

## Contrôles

```powershell
npm run build
node --test tests/*.test.mjs
npm run preview -- --host 127.0.0.1 --port 4321
```

Compilation statique : 17 pages. Tests automatisés : 8 réussis.
Contrôles navigateur : largeurs 320, 390 et 1 440 px, liens de contact,
choix des avis au clic et au clavier, passage automatique à l’avis suivant, pause,
préférence de réduction des animations,
galerie mobile sans duplication et formulaire acceptant le 29/02/2028 tout en
refusant le 32/13/2027. Aucun nouvel envoi réel nécessaire pour ces vérifications.

## Validation avant publication

Mariages.net est mis à jour. Hedi a validé la prévisualisation locale et autorisé
le commit et le push. Après publication, contrôler le déploiement Vercel puis
mesurer PageSpeed sur la nouvelle version. Aucun nouveau score de production ni
gain de conversion n’est revendiqué avant cette mesure.
