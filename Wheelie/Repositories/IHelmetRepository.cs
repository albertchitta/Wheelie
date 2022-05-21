using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IHelmetRepository
    {
        List<Helmet> GetAllHelmets();
        void AddHelmet(Helmet helmet);
        void UpdateHelmet(Helmet helmet);
        void DeleteHelmet(Helmet helmet);
        Helmet GetHelmetById(int id);
    }
}
