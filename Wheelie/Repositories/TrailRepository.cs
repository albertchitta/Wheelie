using Wheelie.Models;
using Microsoft.Data.SqlClient;

namespace Wheelie.Repositories
{
    public class TrailRepository : ITrailRepository
    {
        private readonly IConfiguration _config;

        public TrailRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection
                    (_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Trail> GetAllTrails()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               BikerId,
                                               ImageUrl,
                                               [Name],
                                               [Location],
                                               Distance,
                                               Grade
                                        FROM Trail";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Trail> trails = new List<Trail>();
                    while (reader.Read())
                    {
                        Trail trail = new Trail
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            BikerId = reader.GetInt32(reader.GetOrdinal("BikerId")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            Distance = (double)reader.GetDecimal(reader.GetOrdinal("Distance")),
                            Grade = reader.GetInt32(reader.GetOrdinal("Grade")),
                        };

                        trails.Add(trail);
                    }

                    reader.Close();

                    Console.WriteLine(trails);
                    return trails;
                }
            }
        }

        public List<Trail> GetTrailsByBikerId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               BikerId,
                                               ImageUrl,
                                               [Name],
                                               [Location],
                                               Distance,
                                               Grade
                                        FROM Trail
                                        WHERE BikerId = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Trail> trails = new List<Trail>();
                    while (reader.Read())
                    {
                        Trail trail = new Trail
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            BikerId = reader.GetInt32(reader.GetOrdinal("BikerId")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            Distance = (double)reader.GetDecimal(reader.GetOrdinal("Distance")),
                            Grade = reader.GetInt32(reader.GetOrdinal("Grade")),
                        };

                        trails.Add(trail);
                    }

                    reader.Close();

                    Console.WriteLine(trails);
                    return trails;
                }
            }
        }

        public Trail GetTrailById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               BikerId,
                                               ImageUrl,
                                               [Name],
                                               [Location],
                                               Distance,
                                               Grade
                                        FROM Trail
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Trail trail = new Trail
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            BikerId = reader.GetInt32(reader.GetOrdinal("BikerId")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            Distance = (double)reader.GetDecimal(reader.GetOrdinal("Distance")),
                            Grade = reader.GetInt32(reader.GetOrdinal("Grade"))
                        };

                        reader.Close();
                        return trail;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddTrail(Trail trail)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Trail (BikerId,
                                                           ImageUrl,
                                                           [Name],
                                                           [Location],
                                                           Distance,
                                                           Grade)
                                        OUTPUT INSERTED.ID
                                        VALUES (@BikerId, @ImageUrl, @name, @location, @distance, @grade);";

                    cmd.Parameters.AddWithValue("@bikerId", trail.BikerId);
                    cmd.Parameters.AddWithValue("@imageUrl", trail.ImageUrl);
                    cmd.Parameters.AddWithValue("@name", trail.Name);
                    cmd.Parameters.AddWithValue("@location", trail.Location);
                    cmd.Parameters.AddWithValue("@distance", trail.Distance);
                    cmd.Parameters.AddWithValue("@grade", trail.Grade);

                    int id = (int)cmd.ExecuteScalar();

                    trail.Id = id;
                }
            }
        }

        public void UpdateTrail(Trail trail)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Trail
                                        SET BikerId = @bikerId,
                                            ImageUrl = @imageUrl,
                                            [Name] = @name,
                                            [Location] = @location,
                                            Distance = @distance,
                                            Grade = @grade
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", trail.Id);
                    cmd.Parameters.AddWithValue("@bikerId", trail.BikerId);
                    cmd.Parameters.AddWithValue("@imageUrl", trail.ImageUrl);
                    cmd.Parameters.AddWithValue("@name", trail.Name);
                    cmd.Parameters.AddWithValue("@location", trail.Location);
                    cmd.Parameters.AddWithValue("@distance", trail.Distance);
                    cmd.Parameters.AddWithValue("@grade", trail.Grade);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteTrail(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Trail
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
